package ma.project.civ.services.organigramme;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.ServiceDTO;
import ma.project.civ.entities.organigramme.Service;
import ma.project.civ.mapper.ServiceMapper;
import ma.project.civ.repositories.organigramme.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class ServiceServiceImp implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    @Override
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll()
                .stream()
                .map(serviceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Service> findById(Long id) {
        return serviceRepository.findById(id);
    }

    @Override
    public Service save(ma.project.civ.entities.organigramme.Service service) {
        return serviceRepository.save(service);
    }
}
