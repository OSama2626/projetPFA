package ma.project.civ.mapper;

import ma.project.civ.dto.ProcedureDTO;
import ma.project.civ.entities.controles.ControlProcedure;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ProcedureMapper {
    public ProcedureDTO fromProcedure(ControlProcedure procedure) {
        ProcedureDTO procedureDTO = new ProcedureDTO();
        BeanUtils.copyProperties(procedure, procedureDTO);
        return procedureDTO;
    }

    public ControlProcedure fromProcedureDTO(ProcedureDTO procedureDTO) {
        ControlProcedure procedure = new ControlProcedure();
        BeanUtils.copyProperties(procedureDTO, procedure);
        return procedure;
    }
}