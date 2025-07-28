package ma.project.civ.mapper;

import ma.project.civ.dto.ProcedureDTO;
import ma.project.civ.entities.Procedure;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProcedureMapper extends GenericMapper<Procedure, ProcedureDTO> {
}
