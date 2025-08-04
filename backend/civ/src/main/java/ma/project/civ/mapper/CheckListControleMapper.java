package ma.project.civ.mapper;

import ma.project.civ.dto.CheckListControleDTO;
import ma.project.civ.entities.CheckListControle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CheckListControleMapper {

    @Mapping(target = "controleAPriori", ignore = true)
    @Mapping(target = "controleSurVif", ignore = true)
    @Mapping(target = "criteresControles", expression = "java(ma.project.civ.mapper.JsonMapperUtil.objectToString(dto.getCriteresControles()))")
    CheckListControle toEntity(CheckListControleDTO dto);

    @Mapping(target = "criteresControles", expression = "java(ma.project.civ.mapper.JsonMapperUtil.stringToMap(entity.getCriteresControles()))")
    CheckListControleDTO toDto(CheckListControle entity);
}