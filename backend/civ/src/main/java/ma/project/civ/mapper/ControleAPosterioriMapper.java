package ma.project.civ.mapper;

import ma.project.civ.dto.ControleAPosterioriDTO;
import ma.project.civ.entities.controles.ControleAPosteriori;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ControleAPosterioriMapper {

    private final ProcedureMapper procedureMapper;

    public ControleAPosterioriMapper(ProcedureMapper procedureMapper) {
        this.procedureMapper = procedureMapper;
    }

    public ControleAPosterioriDTO fromControleAPosteriori(ControleAPosteriori controleAPosteriori){
        ControleAPosterioriDTO controleAPosterioriDTO = new ControleAPosterioriDTO();
        BeanUtils.copyProperties(controleAPosteriori, controleAPosterioriDTO);
        if (controleAPosteriori.getProcedures() != null) {
            controleAPosterioriDTO.setProcedures(controleAPosteriori.getProcedures().stream()
                    .map(procedureMapper::fromProcedure)
                    .collect(Collectors.toList()));
        }
        return controleAPosterioriDTO;
    }

    public ControleAPosteriori fromControleAPosterioriDTO(ControleAPosterioriDTO controleAPosterioriDTO){
        ControleAPosteriori controleAPosteriori = new ControleAPosteriori();
        BeanUtils.copyProperties(controleAPosterioriDTO, controleAPosteriori);
        if (controleAPosterioriDTO.getProcedures() != null) {
            controleAPosteriori.setProcedures(controleAPosterioriDTO.getProcedures().stream()
                    .map(procedureMapper::fromProcedureDTO)
                    .collect(Collectors.toList()));
        }
        return controleAPosteriori;
    }
}
