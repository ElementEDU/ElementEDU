package de.gaz.eedu.upload.file;

import de.gaz.eedu.entity.EntityService;
import de.gaz.eedu.exception.CreationException;
import de.gaz.eedu.livechat.message.MessageCreateModel;
import de.gaz.eedu.livechat.message.MessageEntity;
import de.gaz.eedu.livechat.message.MessageModel;
import de.gaz.eedu.livechat.message.MessageRepository;
import de.gaz.eedu.upload.RepositoryEntity;
import de.gaz.eedu.upload.RepositoryRepository;
import de.gaz.eedu.user.UserService;
import de.gaz.eedu.user.privileges.PrivilegeEntity;
import de.gaz.eedu.user.privileges.PrivilegeRepository;
import de.gaz.eedu.user.privileges.PrivilegeService;
import lombok.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Getter(AccessLevel.PROTECTED)
public class FileService extends EntityService<Long, FileRepository, FileEntity, FileModel, FileCreateModel>
{
    @Getter(AccessLevel.NONE)
    private final FileRepository fileRepository;
    private final RepositoryRepository repositoryRepository;
    private final PrivilegeRepository privilegeRepository;

    private final UserService userService;
    private final PrivilegeService privilegeService;

    @Override
    protected @NotNull FileRepository getRepository()
    {
        return fileRepository;
    }

    @Override
    public @NotNull List<FileEntity> createEntity(@NotNull Set<FileCreateModel> model) throws CreationException
    {
        return model.stream().map(m -> populateEntity(new FileEntity(), m)).toList();
    }

    /**
     * Generates a SHA-256 hash from the contents of a given file.
     *
     * @param file the uploaded file whose contents will be hashed; must not be null
     * @return the computed SHA-256 hash as a hexadecimal string; never null
     * @throws NoSuchAlgorithmException if the SHA-256 algorithm is not available
     * @throws IOException if an I/O error occurs while reading the file
     */
    public @NotNull String getHashFromFile(@NotNull MultipartFile file) throws NoSuchAlgorithmException, IOException
    {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        try(InputStream is = file.getInputStream())
        {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != 0)
            {
                digest.update(buffer, 0, bytesRead);
            }
        }

        return bytesToHex(digest.digest());
    }


    /**
     * Converts a byte array into a hexadecimal string representation.
     *
     * @param hash the byte array to be converted into a hexadecimal string
     * @return the hexadecimal string representation of the given byte array
     */
    public @NotNull String bytesToHex(byte @NotNull [] hash)
    {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash)
        {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1)
            {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * Populates the given {@link FileEntity} with data from the provided {@link FileCreateModel}.
     *
     * @param entity the {@link FileEntity} to populate; must not be null
     * @param m the {@link FileCreateModel} containing the data to populate the entity; must not be null
     * @return the populated {@link FileEntity}; never null
     */
    private @NotNull FileEntity populateEntity(@NotNull FileEntity entity, @NotNull FileCreateModel m)
    {
        entity.setUploader(userService.loadEntityByIDSafe(m.uploaderId()));
        entity.setRepo(repositoryRepository.findById(m.repoId()).orElseThrow(entityUnknown(m.repoId())));
        entity.setHash(m.hash());
        entity.setMimeType(m.mimeType());
        entity.setReadPrivileges(new HashSet<>(privilegeRepository.findAllById(Arrays.asList(m.readPrivileges()))));
        return entity;
    }
}
