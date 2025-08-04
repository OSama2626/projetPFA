package ma.project.civ.mapper;

import ma.project.civ.dto.PPOPDTO;
import ma.project.civ.entities.controles.ControlProcedure;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PPOPMapper {

    public PPOPDTO fromControlProcedure(ControlProcedure procedure) {
        PPOPDTO ppopDTO = new PPOPDTO();
        BeanUtils.copyProperties(procedure, ppopDTO);
        return ppopDTO;
    }

    public ControlProcedure fromPPOPDTO(PPOPDTO ppopDTO) {
        ControlProcedure procedure = new ControlProcedure();
        BeanUtils.copyProperties(ppopDTO, procedure);
        return procedure;
    }
}