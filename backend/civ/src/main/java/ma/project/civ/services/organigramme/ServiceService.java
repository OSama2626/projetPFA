package ma.project.civ.services.organigramme;

import ma.project.civ.dto.ServiceDTO;
import ma.project.civ.entities.organigramme.Service;

import java.util.List;
import java.util.Optional;

public interface ServiceService {
    List<ServiceDTO> getAllServices();
    Optional<Service> findById(Long id);
    Service save(Service service);
}
