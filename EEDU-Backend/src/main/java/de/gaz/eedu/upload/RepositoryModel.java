package de.gaz.eedu.upload;

import de.gaz.eedu.entity.model.EntityModel;
import org.jetbrains.annotations.NotNull;

public record RepositoryModel() implements EntityModel<Long>
{

    @Override
    public @NotNull Long id()
    {
        return 0;
    }

    @Override
    public boolean equals(Object obj)
    {
        return false;
    }

    @Override
    public int hashCode()
    {
        return 0;
    }
}
