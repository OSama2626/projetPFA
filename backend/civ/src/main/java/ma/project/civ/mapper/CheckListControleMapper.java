package ma.project.civ.mapper;

import ma.project.civ.dto.CheckListControleDTO;
import ma.project.civ.entities.CheckListControle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CheckListControleMapper {

    @Mapping(target = "controleAPriori", ignore = true)
    @Mapping(target = "controleSurVif", ignore = true)
    CheckListControle toEntity(CheckListControleDTO dto);

    CheckListControleDTO toDto(CheckListControle entity);
}