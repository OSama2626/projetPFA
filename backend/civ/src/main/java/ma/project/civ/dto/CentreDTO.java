package ma.project.civ.dto;

import lombok.Data;

@Data
public class CentreDTO {
    private Long id;
    private String nom;
    private Long etablissementId;
    private String etablissementNom;
    private int nombreAntennes;
}
