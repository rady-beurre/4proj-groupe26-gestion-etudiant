package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryComptabilite extends JpaRepository<ge.model.ModelComptabilite, Long> {

}