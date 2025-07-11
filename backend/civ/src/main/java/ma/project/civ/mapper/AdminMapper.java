package ma.project.civ.mapper;

import ma.project.civ.dto.AdminDTO;
import ma.project.civ.entities.users.Admin;

import java.util.List;
import java.util.stream.Collectors;

public class AdminMapper {

    public static AdminDTO toDto(Admin admin) {
        if (admin == null) return null;

        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setNom(admin.getNom());
        dto.setPrenom(admin.getPrenom());
        dto.setMatricule(admin.getMatricule());
        dto.setEmail(admin.getEmail());
        dto.setFonction(admin.getFonction());
        return dto;
    }

    public static Admin toEntity(AdminDTO dto) {
        if (dto == null) return null;

        Admin admin = new Admin();
        admin.setId(dto.getId());
        admin.setNom(dto.getNom());
        admin.setPrenom(dto.getPrenom());
        admin.setMatricule(dto.getMatricule());
        admin.setEmail(dto.getEmail());
        admin.setFonction(dto.getFonction());
        admin.setPassword(dto.getPassword()); // Important si tu veux encoder ensuite
        return admin;
    }

    public static List<AdminDTO> toDtoList(List<Admin> admins) {
        if (admins == null) return null;
        return admins.stream().map(AdminMapper::toDto).collect(Collectors.toList());
    }

    public static List<Admin> toEntityList(List<AdminDTO> dtos) {
        if (dtos == null) return null;
        return dtos.stream().map(AdminMapper::toEntity).collect(Collectors.toList());
    }
}
