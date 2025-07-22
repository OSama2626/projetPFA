package ma.project.civ.mapper;

import ma.project.civ.dto.CollaborateurDTO;
import ma.project.civ.entities.collaborateurs.Collaborateur;

public class CollaborateurMapper {

    public static CollaborateurDTO toDto(Collaborateur collaborateur) {
        if (collaborateur == null) {
            return null;
        }

        CollaborateurDTO dto = new CollaborateurDTO();
        dto.setId(collaborateur.getId());
        dto.setNom(collaborateur.getNom());
        dto.setPrenom(collaborateur.getPrenom());
        dto.setMatricule(collaborateur.getMatricule());
        dto.setDate_naissance(collaborateur.getDate_naissance());
        dto.setSituation(collaborateur.getSituation());
        dto.setGamme_train(collaborateur.getGamme_train());
        dto.setFonction_sur_oracle(collaborateur.getFonction_sur_oracle());
        dto.setFonction_exercee(collaborateur.getFonction_exercee());
        dto.setStatus(collaborateur.getStatus());

        return dto;
    }

    public static Collaborateur toEntity(CollaborateurDTO dto) {
        if (dto == null) {
            return null;
        }

        Collaborateur collaborateur = new Collaborateur();
        collaborateur.setId(dto.getId());
        collaborateur.setNom(dto.getNom());
        collaborateur.setPrenom(dto.getPrenom());
        collaborateur.setMatricule(dto.getMatricule());
        collaborateur.setDate_naissance(dto.getDate_naissance());
        collaborateur.setSituation(dto.getSituation());
        collaborateur.setGamme_train(dto.getGamme_train());
        collaborateur.setFonction_sur_oracle(dto.getFonction_sur_oracle());
        collaborateur.setFonction_exercee(dto.getFonction_exercee());
        collaborateur.setStatus(dto.getStatus());

        return collaborateur;
    }
}
