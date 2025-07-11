package ma.project.civ.dto;

import lombok.Data;

import java.util.UUID;
@Data
public class AdminDTO {
    private UUID id;
    private String nom;
    private String prenom;
    private String matricule;
    private String email;
    private String fonction;
    private String password;
}
