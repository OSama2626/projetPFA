package ma.project.civ.mapper;

import ma.project.civ.dto.ProcedureDTO;
import ma.project.civ.entities.controles.Procedure;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ProcedureMapper {
    public ProcedureDTO fromProcedure(Procedure procedure){
        ProcedureDTO procedureDTO = new ProcedureDTO();
        BeanUtils.copyProperties(procedure,procedureDTO);
        return procedureDTO;
    }

    public Procedure fromProcedureDTO(ProcedureDTO procedureDTO){
        Procedure procedure = new Procedure();
        BeanUtils.copyProperties(procedureDTO,procedure);
        return procedure;
    }
}
