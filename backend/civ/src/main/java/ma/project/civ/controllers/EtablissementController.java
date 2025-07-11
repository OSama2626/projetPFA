package ma.project.civ.controllers;

import lombok.AllArgsConstructor;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.services.EtablissementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/etablissements")
public class EtablissementController {

    private final EtablissementService etablissementService;
    @GetMapping
    public ResponseEntity<List<Etablissement>> getAll(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Etablissement> etablissements = etablissementService.getAllEtablissement();
        return ResponseEntity.ok(etablissements);
    }
}
