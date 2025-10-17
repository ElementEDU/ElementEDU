package de.gaz.eedu.upload.file;

import de.gaz.eedu.entity.model.CreationFactory;
import de.gaz.eedu.entity.model.CreationModel;
import de.gaz.eedu.upload.RepositoryEntity;
import de.gaz.eedu.user.UserEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public record FileCreateModel(@NotNull Long repoId, @NotNull Long uploaderId, @NotNull String hash, @NotNull String fileName,
                              @NotNull String mimeType, @NotNull String[] readPrivileges)
        implements CreationModel<Long, FileEntity>
{

    @Override public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileCreateModel that = (FileCreateModel) o;
        return Objects.equals(repoId, that.repoId) && Objects.equals(uploaderId, that.uploaderId) && Objects.equals(
                fileName,
                that.fileName) && Objects.deepEquals(readPrivileges, that.readPrivileges);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(repoId, uploaderId, fileName, Arrays.hashCode(readPrivileges));
    }

    @Override
    public String toString()
    {
        return "";
    }

    @Override
    public @NotNull FileEntity toEntity(@NotNull FileEntity entity)
    {
        entity.setFileName(fileName());
        return entity;
    }
}
