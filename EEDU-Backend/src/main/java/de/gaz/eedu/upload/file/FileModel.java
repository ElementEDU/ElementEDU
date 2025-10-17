package de.gaz.eedu.upload.file;

import de.gaz.eedu.entity.model.EntityModel;
import de.gaz.eedu.upload.RepositoryModel;
import de.gaz.eedu.user.model.UserModel;
import de.gaz.eedu.user.privileges.model.PrivilegeModel;
import org.jetbrains.annotations.NotNull;

import java.util.Objects;
import java.util.Set;

public record FileModel(@NotNull Long id, RepositoryModel repo, @NotNull UserModel uploader,
                        @NotNull String hash, @NotNull String fileName, @NotNull String mimeType,
                        @NotNull Set<PrivilegeModel> readPrivileges)
        implements EntityModel<Long>
{
    @Override
    public @NotNull Long id()
    {
        return id;
    }

    @Override public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileModel fileModel = (FileModel) o;
        return Objects.equals(id, fileModel.id);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id(), uploader(), hash(), fileName(), mimeType());
    }

    @Override public String toString()
    {
        return "FileModel{" +
                "id=" + id +
                ", uploader=" + uploader +
                ", hash='" + hash + '\'' +
                ", fileName='" + fileName + '\'' +
                ", mimeType='" + mimeType + '\'' +
                '}';
    }
}
