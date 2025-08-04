package ma.project.civ.mapper;

import ma.project.civ.dto.ProcedureDTO;
import ma.project.civ.entities.Procedure;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProcedureMapper {

    @Mapping(target = "controleAPriori", ignore = true)
    @Mapping(target = "controleSurVif", ignore = true)
    @Mapping(target = "criteresControle", expression = "java(ma.project.civ.mapper.JsonMapperUtil.objectToString(dto.getCriteresDeControle()))")
    Procedure toEntity(ProcedureDTO dto);

    @Mapping(target = "criteresDeControle", expression = "java(ma.project.civ.mapper.JsonMapperUtil.stringToMap(entity.getCriteresControle()))")
    ProcedureDTO toDto(Procedure entity);
}