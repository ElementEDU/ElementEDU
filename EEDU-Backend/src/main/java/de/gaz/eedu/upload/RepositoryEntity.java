package de.gaz.eedu.upload;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.gaz.eedu.entity.model.EntityModelRelation;
import de.gaz.eedu.upload.file.FileEntity;
import de.gaz.eedu.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.util.Set;
import java.util.stream.Collectors;

@Entity @Getter @AllArgsConstructor @NoArgsConstructor
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
        return new RepositoryModel(getId(), getFiles().stream().map(FileEntity::toModel).collect(Collectors.toSet()));
    }

    public Set<UserEntity> getContributors()
    {
        return getFiles().stream().map(FileEntity::getUploader).collect(Collectors.toSet());
    }
}
