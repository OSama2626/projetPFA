package ma.project.civ.mapper;

import ma.project.civ.dto.AdminEtablissementDTO;
import ma.project.civ.entities.users.AdminEtablissement;

import java.util.List;
import java.util.stream.Collectors;
import ma.project.civ.entities.organigramme.Etablissement;


public class AdminEtablissementMapper {

    /**
     * Convertit un AdminEtablissement en AdminEtablissementDTO
     */
    public static AdminEtablissementDTO toDto(AdminEtablissement admin) {
        if (admin == null) return null;

        AdminEtablissementDTO dto = new AdminEtablissementDTO();
        dto.setId(admin.getId());
        dto.setNom(admin.getNom());
        dto.setPrenom(admin.getPrenom());
        dto.setMatricule(admin.getMatricule());
        dto.setEmail(admin.getEmail());
        dto.setFonction(admin.getFonction());
        dto.setPassword(admin.getPassword());
        if (admin.getEtablissement() != null) {
            dto.setEtablissement_id(admin.getEtablissement().getId());
            dto.setEtablissementNom(admin.getEtablissement().getNom());
        }
        return dto;
    }

    /**
     * Convertit un AdminEtablissementDTO en AdminEtablissement
     */
    public static AdminEtablissement toEntity(AdminEtablissementDTO dto, Etablissement etablissement) {
        if (dto == null) return null;

        AdminEtablissement admin = new AdminEtablissement();
        admin.setId(dto.getId());
        admin.setNom(dto.getNom());
        admin.setPrenom(dto.getPrenom());
        admin.setMatricule(dto.getMatricule());
        admin.setEmail(dto.getEmail());
        admin.setFonction(dto.getFonction());
        admin.setPassword(dto.getPassword());
        admin.setEtablissement(etablissement);
        return admin;
    }

    /**
     * Convertit une liste d'entités en liste de DTOs
     */
    public static List<AdminEtablissementDTO> toDtoList(List<AdminEtablissement> admins) {
        if (admins == null) return null;
        return admins.stream()
                .map(AdminEtablissementMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Convertit une liste de DTOs en liste d'entités en associant chaque DTO à son établissement
     */
    public static List<AdminEtablissement> toEntityList(List<AdminEtablissementDTO> dtos, List<Etablissement> etablissements) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> {
                    Etablissement etab = etablissements.stream()
                            .filter(e -> e.getId().equals(dto.getEtablissement_id()))
                            .findFirst()
                            .orElse(null); // Tu peux gérer autrement si non trouvé
                    return toEntity(dto, etab);
                })
                .collect(Collectors.toList());
    }
}
