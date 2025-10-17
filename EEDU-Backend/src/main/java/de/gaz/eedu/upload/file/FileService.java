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

    private UserService userService;
    private PrivilegeService privilegeService;

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

    public @NotNull String getHashFromFile(@NotNull MultipartFile file) throws NoSuchAlgorithmException
    {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
    }

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
