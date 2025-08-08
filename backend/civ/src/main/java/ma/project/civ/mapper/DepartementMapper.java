package ma.project.civ.mapper;

import ma.project.civ.dto.DepartementDTO;
import ma.project.civ.entities.organigramme.Departement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartementMapper {

    @Mappings({
        @Mapping(target = "nombreServices", expression = "java(departement.getServices().size())")
    })
    DepartementDTO toDto(Departement departement);

    List<DepartementDTO> toDto(List<Departement> departements);
}
