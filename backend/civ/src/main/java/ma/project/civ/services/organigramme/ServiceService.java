package ma.project.civ.services.organigramme;

import ma.project.civ.dto.ServiceDTO;

import java.util.List;
import java.util.Optional;

public interface ServiceService {
    List<ServiceDTO> getAllServices();
    Optional<ma.project.civ.entities.organigramme.Service> findById(Long id);
    ma.project.civ.entities.organigramme.Service save(ma.project.civ.entities.organigramme.Service service);
}
