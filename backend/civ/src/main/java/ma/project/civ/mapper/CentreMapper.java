package ma.project.civ.mapper;

import ma.project.civ.dto.CentreDTO;
import ma.project.civ.entities.organigramme.Centre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CentreMapper {

    @Mappings({
        @Mapping(source = "etablissement.id", target = "etablissementId"),
        @Mapping(source = "etablissement.nom", target = "etablissementNom"),
        @Mapping(target = "nombreAntennes", expression = "java(centre.getAntennes().size())")
    })
    CentreDTO toDto(Centre centre);

    List<CentreDTO> toDto(List<Centre> centres);
}
