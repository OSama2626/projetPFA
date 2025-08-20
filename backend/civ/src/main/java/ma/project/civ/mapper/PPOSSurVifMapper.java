package ma.project.civ.mapper;

import ma.project.civ.dto.PPOSDTO;
import ma.project.civ.entities.survif.PPOSSurVif;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PPOSSurVifMapper extends GenericMapper<PPOSSurVif, PPOSDTO> {

    @Override
    @Mapping(target = "controleSurVif", ignore = true)
    PPOSSurVif toEntity(PPOSDTO dto);

    @Override
    PPOSDTO toDto(PPOSSurVif entity);
}
