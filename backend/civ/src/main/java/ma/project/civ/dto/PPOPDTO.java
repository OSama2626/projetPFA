package ma.project.civ.dto;

import lombok.Data;

@Data
public class PPOPDTO {
    private Long id;
    private int numeroPPOP;
    private String designationPPOP;
    private Object criteresDeControle;
    private int coefficient;
}