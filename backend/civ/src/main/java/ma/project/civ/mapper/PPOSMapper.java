package ma.project.civ.mapper;

import ma.project.civ.dto.PPOSDTO;
import ma.project.civ.entities.survif.PPOSSurVif;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PPOSMapper extends GenericMapper<PPOSSurVif, PPOSDTO> {
}
