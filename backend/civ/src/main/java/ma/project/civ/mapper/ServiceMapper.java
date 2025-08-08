package ma.project.civ.mapper;

import ma.project.civ.dto.ServiceDTO;
import ma.project.civ.entities.organigramme.Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {

    @Mappings({
        @Mapping(source = "departement.id", target = "departementId"),
        @Mapping(source = "departement.nom", target = "departementNom")
    })
    ServiceDTO toDto(Service service);

    List<ServiceDTO> toDto(List<Service> services);
}
