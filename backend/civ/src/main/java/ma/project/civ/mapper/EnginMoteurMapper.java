package ma.project.civ.mapper;

import ma.project.civ.dto.EnginMoteurDTO;
import ma.project.civ.entities.engin_moteur.EnginMoteurHabilitation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import ma.project.civ.entities.engin_moteur.SerieE1400;
import ma.project.civ.entities.engin_moteur.SerieZ2M;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;

@Mapper(componentModel = "spring")
public interface EnginMoteurMapper extends GenericMapper<EnginMoteurHabilitation, EnginMoteurDTO> {

    @Override
    @Mappings({
            @Mapping(source = "discriminatorValue", target = "type")
    })
    EnginMoteurDTO toDTO(EnginMoteurHabilitation enginMoteurHabilitation);

    @ObjectFactory
    default EnginMoteurHabilitation toEntity(EnginMoteurDTO dto, @TargetType Class<EnginMoteurHabilitation> type) {
        if (dto == null || dto.getType() == null) {
            return null;
        }
        switch (dto.getType()) {
            case "SerieE1400":
                return new SerieE1400();
            case "SerieZ2M":
                return new SerieZ2M();
            default:
                throw new IllegalArgumentException("Unknown engin moteur type: " + dto.getType());
        }
    }
}
