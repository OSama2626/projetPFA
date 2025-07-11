package ma.project.civ.controllers;

import lombok.AllArgsConstructor;
import ma.project.civ.dto.AdminDTO;
import ma.project.civ.dto.AdminEtablissementDTO;
import ma.project.civ.entities.users.Admin;
import ma.project.civ.entities.users.AdminEtablissement;
import ma.project.civ.mapper.AdminEtablissementMapper;
import ma.project.civ.mapper.AdminMapper;
import ma.project.civ.repositories.users.AdminEtablissementRepository;
import ma.project.civ.services.AuthorizationService;
import ma.project.civ.services.UserAppService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final UserAppService userAppService;
    private final AuthorizationService authorizationService;
@PostMapping("/create")
public ResponseEntity<AdminDTO> createAdmin(Authentication authentication, @RequestBody AdminDTO adminDTO) {
    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    if (!authorizationService.isAdmin(authentication)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    Admin admin = AdminMapper.toEntity(adminDTO);
    Admin createdAdmin = userAppService.createAdmin(admin);
    return ResponseEntity.status(HttpStatus.CREATED).body(AdminMapper.toDto(createdAdmin));
}

    @GetMapping("/all")
    public ResponseEntity<Page<AdminDTO>> getAllAdmins(
            @RequestParam(required = false) String matricule,
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String prenom,
            @RequestParam(required = false) String fonction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Page<AdminDTO> admins = userAppService.getAdmins(matricule, nom, prenom, fonction, page, size);
        return ResponseEntity.ok(admins);
    }


    @GetMapping("/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Admin> admin = userAppService.getAdminById(id);
        return admin.map(a -> ResponseEntity.ok(AdminMapper.toDto(a)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

@PutMapping("/{id}")
public ResponseEntity<AdminDTO> updateAdmin(@PathVariable UUID id, @RequestBody AdminDTO adminDTO, Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    if (!authorizationService.isAdmin(authentication)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    Admin updated = userAppService.updateAdmin(id, AdminMapper.toEntity(adminDTO));
    return ResponseEntity.ok(AdminMapper.toDto(updated));
}


    @DeleteMapping("/{id}")
    public ResponseEntity<AdminDTO> deleteAdmin(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Admin deleted = userAppService.deleteAdmin(id);
        return ResponseEntity.ok(AdminMapper.toDto(deleted));
    }



}
