package ma.project.civ.dto;

import lombok.Data;

@Data
public class AntenneDTO {
    private Long id;
    private String nom;
    private Long centreId;
    private String centreNom;
}
