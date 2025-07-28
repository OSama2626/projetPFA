package ma.project.civ.mapper;

import ma.project.civ.dto.CheckListControleDTO;
import ma.project.civ.entities.CheckListControle;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CheckListControleMapper extends GenericMapper<CheckListControle, CheckListControleDTO> {
}
