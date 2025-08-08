package ma.project.civ.dto;

import lombok.Data;

@Data
public class ServiceDTO {
    private Long id;
    private String nom;
    private Long departementId;
    private String departementNom;
}
