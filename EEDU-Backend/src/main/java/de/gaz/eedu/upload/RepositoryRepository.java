package de.gaz.eedu.upload;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Don't laugh. I just realized that as well.
// But it's funny so I'll keep it
@Repository
public interface RepositoryRepository extends JpaRepository<RepositoryEntity, Long>
{
}
