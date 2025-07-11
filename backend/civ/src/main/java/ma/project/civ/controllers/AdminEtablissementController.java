package ma.project.civ.controllers;


import lombok.AllArgsConstructor;
import ma.project.civ.dto.AdminEtablissementDTO;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.entities.users.AdminEtablissement;
import ma.project.civ.mapper.AdminEtablissementMapper;
import ma.project.civ.repositories.organigramme.EtablissementRepository;
import ma.project.civ.repositories.users.AdminEtablissementRepository;
import ma.project.civ.services.AuthorizationService;
import ma.project.civ.services.UserAppService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/admin_etablissement")
public class AdminEtablissementController {
    private final UserAppService userAppService;
    private final AuthorizationService authorizationService;
    private final EtablissementRepository etablissementRepository;

    @PostMapping("/create")
    public ResponseEntity<AdminEtablissementDTO> createAdminEtablissement(Authentication authentication, @RequestBody AdminEtablissementDTO adminEtablissementDTO) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Etablissement etablissement = etablissementRepository.findById(adminEtablissementDTO.getEtablissement_id()).orElse(null);
        if (etablissement == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        AdminEtablissement admin = AdminEtablissementMapper.toEntity(adminEtablissementDTO,etablissement);
        AdminEtablissement createdAdminEta = userAppService.createAdminEta(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(AdminEtablissementMapper.toDto(createdAdminEta));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<AdminEtablissementDTO>> getAllAdminsEtablissement(
            @RequestParam(required = false) String matricule,
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String prenom,
            @RequestParam(required = false) String fonction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Page<AdminEtablissementDTO> admins = userAppService.getAdminsEtablissement(matricule, nom, prenom, fonction, page, size);
        return ResponseEntity.ok(admins);
    }


    @GetMapping("/{id}")
    public ResponseEntity<AdminEtablissementDTO> getAdminEtablissementById(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!authorizationService.isAdmin(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<AdminEtablissement> admin = userAppService.getAdminEtablissementById(id);
        return admin.map(a -> ResponseEntity.ok(AdminEtablissementMapper.toDto(a)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<AdminEtablissementDTO> updateAdminEtablissement(@PathVariable UUID id, @RequestBody AdminEtablissementDTO adminDTO, Authentication authentication) {
//        if (authentication == null || !authentication.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        if (!authorizationService.isAdmin(authentication)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//
//        AdminEtablissement updated = userAppService.updateAdminEta(id, AdminEtablissementMapper.toEntity(adminDTO));
//        return ResponseEntity.ok(AdminEtablissementMapper.toDto(updated));
//    }
//
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<AdminEtablissementDTO> deleteAdminEtablissement(@PathVariable UUID id, Authentication authentication) {
//        if (authentication == null || !authentication.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        if (!authorizationService.isAdmin(authentication)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//
//        AdminEtablissement deleted = userAppService.deleteAdminEta(id);
//        return ResponseEntity.ok(AdminEtablissementMapper.toDto(deleted));
//    }

}
