package ma.project.civ.dto;

import lombok.Data;

@Data
public class ProcedureDTO {
    private Long id;
    private int numeroPR;
    private String designationPR;
    private String criteresControle;
    private int coefficient;
}
