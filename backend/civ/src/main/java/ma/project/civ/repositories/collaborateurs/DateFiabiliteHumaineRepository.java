package ma.project.civ.repositories.collaborateurs;

import ma.project.civ.entities.collaborateurs.DateFiabiliteHumaine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DateFiabiliteHumaineRepository extends JpaRepository<DateFiabiliteHumaine, UUID> {
}
