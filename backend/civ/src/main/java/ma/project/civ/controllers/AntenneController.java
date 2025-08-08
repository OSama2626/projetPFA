package ma.project.civ.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.project.civ.dto.AntenneCreateRequest;
import ma.project.civ.dto.AntenneDTO;
import ma.project.civ.entities.organigramme.Antenne;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.mapper.AntenneMapper;
import ma.project.civ.services.organigramme.AntenneService;
import ma.project.civ.services.organigramme.CentreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/antennes")
public class AntenneController {

    private final AntenneService antenneService;
    private final CentreService centreService;
    private final AntenneMapper antenneMapper;

    @GetMapping
    public ResponseEntity<List<AntenneDTO>> getAll() {
        return ResponseEntity.ok(antenneService.getAllAntennes());
    }

    @PostMapping
    public ResponseEntity<AntenneDTO> createAntenne(@Valid @RequestBody AntenneCreateRequest request) {
        Optional<Centre> centreOptional = centreService.findById(request.getCentreId());
        if (centreOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Antenne antenne = new Antenne();
        antenne.setNom(request.getNom());
        antenne.setCentre(centreOptional.get());

        Antenne savedAntenne = antenneService.save(antenne);
        return new ResponseEntity<>(antenneMapper.toDto(savedAntenne), HttpStatus.CREATED);
    }
}
