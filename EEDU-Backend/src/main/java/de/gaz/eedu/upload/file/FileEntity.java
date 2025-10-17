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
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Entity @AllArgsConstructor @Getter @Setter
@NoArgsConstructor
public class FileEntity implements EntityModelRelation<Long, FileModel>
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch= FetchType.LAZY) @JsonBackReference private RepositoryEntity repo;
    @OneToOne private UserEntity uploader;
    private String hash;
    private String fileName;
    private String mimeType;
    @ManyToMany(fetch= FetchType.LAZY)
    @JoinTable(name="file_read_privileges", joinColumns = @JoinColumn(name = "file_id"),
               inverseJoinColumns = @JoinColumn(name="privilege_id")) private Set<PrivilegeEntity> readPrivileges;

    @Override
    public boolean deleteManagedRelations()
    {
//        try
//        {
//            FileUtils.deleteDirectory(new File(getFilePath()));
//        }
//        catch (IOException ioException)
//        {
//            String errorMessage = "The server could not delete the referenced file: " + getFilePath();
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage, ioException);
//        }
        return false;
    }

    @Override
    public FileModel toModel()
    {
        return new FileModel(id, getRepo().toModel(), getUploader().toModel(), getHash(), getFileName(), getMimeType(),
                getReadPrivileges().stream().map(PrivilegeEntity::toModel).collect(Collectors.toSet()));
    }

    public String getFilePath()
    {
        return hash.substring(0, 2) + "/" + hash.substring(2, 4) + "/" + hash;
    }

    public void createDirectory(@NotNull String subdirectory)
    {
        File pathFile = new File(getFilePath());
        Boolean directoryCreated = pathFile.mkdirs();

        if(!directoryCreated)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "The server was unable to create the directory for your file.");
        }
    }

}
