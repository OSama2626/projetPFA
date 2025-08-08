package ma.project.civ.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.project.civ.dto.CentreCreateRequest;
import ma.project.civ.dto.CentreDTO;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.entities.organigramme.Etablissement;
import ma.project.civ.mapper.CentreMapper;
import ma.project.civ.services.EtablissementService;
import ma.project.civ.services.organigramme.CentreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/centres")
public class CentreController {

    private final CentreService centreService;
    private final EtablissementService etablissementService;
    private final CentreMapper centreMapper;

    @GetMapping
    public ResponseEntity<List<CentreDTO>> getAll() {
        return ResponseEntity.ok(centreService.getAllCentres());
    }

    @PostMapping
    public ResponseEntity<CentreDTO> createCentre(@Valid @RequestBody CentreCreateRequest request) {
        Optional<Etablissement> etablissementOptional = etablissementService.findById(request.getEtablissementId());
        if (etablissementOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Centre centre = new Centre();
        centre.setNom(request.getNom());
        centre.setEtablissement(etablissementOptional.get());

        Centre savedCentre = centreService.save(centre);
        return new ResponseEntity<>(centreMapper.toDto(savedCentre), HttpStatus.CREATED);
    }
}
