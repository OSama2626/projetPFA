package ma.project.civ.dto;

import lombok.Data;

@Data
public class PPOSDTO {
    private Long id;
    private int numeroPPOS;
    private String typePPOS;
    private String designationPPOS;
    private String criteresControle;
    private int coefficient;
}
