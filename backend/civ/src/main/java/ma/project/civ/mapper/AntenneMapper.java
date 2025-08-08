package ma.project.civ.mapper;

import ma.project.civ.dto.AntenneDTO;
import ma.project.civ.entities.organigramme.Antenne;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AntenneMapper {

    @Mappings({
        @Mapping(source = "centre.id", target = "centreId"),
        @Mapping(source = "centre.nom", target = "centreNom")
    })
    AntenneDTO toDto(Antenne antenne);

    List<AntenneDTO> toDto(List<Antenne> antennes);
}
