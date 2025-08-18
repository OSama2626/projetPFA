package ma.project.civ.controllers.materiel;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.materiel.LigneDTO;
import ma.project.civ.services.materiel.LigneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lignes")
@RequiredArgsConstructor
public class LigneController {

    private final LigneService ligneService;

    @GetMapping
    public ResponseEntity<List<LigneDTO>> getAllLignes() {
        return ResponseEntity.ok(ligneService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneDTO> getLigneById(@PathVariable Long id) {
        return ResponseEntity.ok(ligneService.findById(id));
    }

    @PostMapping
    public ResponseEntity<LigneDTO> createLigne(@Valid @RequestBody LigneDTO ligneDTO) {
        return new ResponseEntity<>(ligneService.save(ligneDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneDTO> updateLigne(@PathVariable Long id, @Valid @RequestBody LigneDTO ligneDTO) {
        return ResponseEntity.ok(ligneService.update(id, ligneDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLigne(@PathVariable Long id) {
        ligneService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
