package de.gaz.eedu.upload.file;

import com.fasterxml.jackson.annotation.JsonBackReference;
import de.gaz.eedu.entity.model.EntityModelRelation;
import de.gaz.eedu.upload.RepositoryEntity;
import de.gaz.eedu.user.UserEntity;
import de.gaz.eedu.user.privileges.PrivilegeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity class representing a file stored in the system.
 * Contains metadata about the file, its uploader, repository association, and access privileges.
 * Implements {@link EntityModelRelation} to provide a mapping to the {@code FileModel} representation.
 *
 * An instance of this class is identified uniquely by its ID. Each file is also associated with a
 * hash value used for storage and identification purposes.
 */
@Entity @AllArgsConstructor @Getter @Setter
@NoArgsConstructor
public class FileEntity implements EntityModelRelation<Long, FileModel>
{
    private static final Logger log = LoggerFactory.getLogger(FileEntity.class);
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch= FetchType.LAZY) @JsonBackReference private RepositoryEntity repo;
    @OneToOne private UserEntity uploader;
    private String hash;
    private String fileName;
    private String mimeType;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "file_read_privileges", joinColumns = @JoinColumn(name = "file_entity_id"))
    private Set<String> readPrivileges;

    @Override
    public boolean deleteManagedRelations()
    {
        if(!deleteFile()) {
            String errorMessage = "The server could not delete the referenced file: " + getFullFilePath();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
        }

        return true;
    }

    /**
     * Converts the current FileEntity instance into its corresponding FileModel representation.
     * This process involves mapping all relevant fields from the entity to the model,
     * including associated entities such as repository, uploader, and readPrivileges.
     *
     * @return a FileModel instance representing the current FileEntity with all its attributes and relations.
     */
    @Override
    public FileModel toModel()
    {
        return new FileModel(id, getRepo().toModel(), getUploader().toModel(), getHash(), getFileName(), getMimeType(),
                getReadPrivileges());
    }

    /**
     * Generates and returns a file path based on the object's hash value.
     * The path is constructed by creating a directory structure using the first two and
     * the next two characters of the hash.
     *
     * @return A string representing the subdirectory path derived from the hash value.
     */
    public String getFilePath()
    {
        return hash.substring(0, 2) + "/" + hash.substring(2, 4) + "/";
    }

    /**
     * Constructs and returns the full file path by combining the directory path generated
     * by {@code getFilePath()} and the hash value. The resulting path includes both the
     * subdirectory structure and the hash value as the file name.
     *
     * @return a string representing the complete file path for the current file entity.
     */
    public String getFullFilePath()
    {
        return getFilePath() + hash;
    }

    /**
     * Uploads a file in batch mode to the file system. The file's location is determined
     * by a generated file path based on the object's hash value. If a file corresponding
     * to the current hash value already exists, the method exits without performing any
     * operations. Otherwise, it ensures the necessary directory structure exists and saves
     * the file to the target path.
     *
     * @param file the file to be uploaded; must not be null and must conform to the {@code MultipartFile} specification
     */
    public void uploadBatch(@NotNull MultipartFile file)
    {
        try
        {
            if(fileExists()) return;

            createDirectory();

            Path path = Path.of(getFullFilePath());
            file.transferTo(path);
        }
        catch (IOException e)
        {
            log.error("Error at file upload: ", e);
        }
    }

    /**
     * Checks whether a file corresponding to the object's hash value exists in the file system.
     * The file path is determined by combining a subdirectory path generated from the hash
     * and the hash itself.
     *
     * @return true if the file exists and is a standard file; false otherwise.
     */
    public boolean fileExists()
    {
        File f = new File(getFilePath() + hash);
        return f.isFile();
    }

    public boolean hasAccess(@NotNull UserEntity user)
    {
        return user.hasAnyAuthority(getReadPrivileges());
    }

    /**
     * Creates a directory using the file path derived from the object's hash value.
     * The directory structure is determined by subdirectories generated from the first two and the next
     * two characters of the hash value, as defined by the {@code getFilePath} method.
     * <p>
     * If the directory cannot be created, an internal server error is raised to indicate the failure.
     * <p>
     * Throws a {@link ResponseStatusException} with an HTTP 500 status
     * if the directory creation fails.
     */
    public void createDirectory()
    {
        File pathFile = new File(getFilePath());
        boolean directoryCreated = pathFile.mkdirs();

        if(!directoryCreated)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "The server was unable to create the directory for your file.");
        }
    }

    /**
     * Deletes the file specified by its full file path, which is determined by the
     * {@code getFullFilePath()} method. This method attempts to locate the file
     * on the disk and remove it.
     *
     * @return true if the file is successfully deleted; false if the file does not
     * exist or the deletion fails.
     */
    public boolean deleteFile()
    {
        File f = new File(getFullFilePath());
        return f.delete();
    }
}
