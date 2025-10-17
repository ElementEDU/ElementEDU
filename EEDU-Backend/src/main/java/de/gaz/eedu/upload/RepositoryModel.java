package de.gaz.eedu.upload;

import de.gaz.eedu.entity.model.EntityModel;
import de.gaz.eedu.upload.file.FileModel;
import org.jetbrains.annotations.NotNull;

import java.util.Objects;
import java.util.Set;

public record RepositoryModel(@NotNull Long id, @NotNull Set<FileModel> files) implements EntityModel<Long>
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
        RepositoryModel that = (RepositoryModel) o;
        return Objects.equals(id(), that.id()) && Objects.equals(files(), that.files());
    }

    @Override public String toString()
    {
        return "RepositoryModel{" +
                "id=" + id() +
                ", files=" + files() +
                '}';
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id);
    }
}
