package ma.project.civ.dto;

import lombok.Data;
import java.util.List;

@Data
public class ControleAPosterioriDTO {
    private Long id;
    private int annee;
    private String trimestre;
    private String fonction;
    private String etablissement;
    private String centre;
    private String antenne;
    private String responsable;
    private List<ProcedureDTO> procedures;
}
