package ma.project.civ.mapper;

import ma.project.civ.dto.EtablissementDTO;
import ma.project.civ.entities.organigramme.Etablissement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EtablissementMapper {

    @Mappings({
        @Mapping(target = "nombreCentres", expression = "java(etablissement.getCentres().size())")
    })
    EtablissementDTO toDto(Etablissement etablissement);

    List<EtablissementDTO> toDto(List<Etablissement> etablissements);
}
