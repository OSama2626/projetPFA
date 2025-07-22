package ma.project.civ.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserAppDTO {
    private UUID id;
    private String nom;
    private String prenom;
    private String email;
    private String matricule;
    private String fonction;
    private String password;
}
