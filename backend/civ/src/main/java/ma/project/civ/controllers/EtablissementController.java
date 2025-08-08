package ma.project.civ.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.project.civ.dto.EtablissementCreateRequest;
import ma.project.civ.dto.EtablissementDTO;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.mapper.EtablissementMapper;
import ma.project.civ.services.EtablissementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/etablissements")
public class EtablissementController {

    private final EtablissementService etablissementService;
    private final EtablissementMapper etablissementMapper;

    @GetMapping
    public ResponseEntity<List<EtablissementDTO>> getAll() {
        return ResponseEntity.ok(etablissementService.getAllEtablissements());
    }

    @PostMapping
    public ResponseEntity<EtablissementDTO> createEtablissement(@Valid @RequestBody EtablissementCreateRequest request) {
        Etablissement etablissement = new Etablissement();
        etablissement.setNom(request.getNom());
        Etablissement savedEtablissement = etablissementService.save(etablissement);
        return new ResponseEntity<>(etablissementMapper.toDto(savedEtablissement), HttpStatus.CREATED);
    }
}
