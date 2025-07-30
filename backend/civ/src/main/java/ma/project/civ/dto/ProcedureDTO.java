package ma.project.civ.dto;

import lombok.Data;

@Data
public class ProcedureDTO {
    private Long id;
    private int numeroPPOP;
    private String designationPPOP;
    private Object criteresDeControle;
    private int coefficient;
}
