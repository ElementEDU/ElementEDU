package de.gaz.eedu.upload;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.gaz.eedu.entity.model.EntityModelRelation;
import de.gaz.eedu.upload.file.FileEntity;
import de.gaz.eedu.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class RepositoryEntity implements EntityModelRelation<Long, RepositoryModel>
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToMany(mappedBy="upload", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference private Set<FileEntity> files;

    @Override
    public @NotNull Long getId()
    {
        return id;
    }

    @Override
    public boolean deleteManagedRelations()
    {
        return EntityModelRelation.super.deleteManagedRelations();
    }

    @Override
    public RepositoryModel toModel()
    {
        return null;
    }

    public Set<UserEntity> getContributors()
    {
        return getFiles().stream().map(FileEntity::getUploader).collect(Collectors.toSet());
    }
}
