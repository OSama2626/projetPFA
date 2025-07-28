package ma.project.civ.mapper;

import ma.project.civ.dto.ControleSurVifDTO;
import ma.project.civ.entities.ControleSurVif;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ControleSurVifMapper extends GenericMapper<ControleSurVif, ControleSurVifDTO> {
}
