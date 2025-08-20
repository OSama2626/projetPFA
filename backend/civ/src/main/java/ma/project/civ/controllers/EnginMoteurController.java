package ma.project.civ.controllers;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.EnginMoteurDTO;
import ma.project.civ.services.EnginMoteurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/engin-moteurs")
@RequiredArgsConstructor
public class EnginMoteurController {

    private final EnginMoteurService enginMoteurService;

    @GetMapping
    public ResponseEntity<List<EnginMoteurDTO>> getAllEnginMoteurs() {
        return ResponseEntity.ok(enginMoteurService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnginMoteurDTO> getEnginMoteurById(@PathVariable Long id) {
        return ResponseEntity.ok(enginMoteurService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EnginMoteurDTO> createEnginMoteur(@RequestBody EnginMoteurDTO enginMoteurDTO) {
        return new ResponseEntity<>(enginMoteurService.save(enginMoteurDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnginMoteurDTO> updateEnginMoteur(@PathVariable Long id, @RequestBody EnginMoteurDTO enginMoteurDTO) {
        return ResponseEntity.ok(enginMoteurService.update(id, enginMoteurDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnginMoteur(@PathVariable Long id) {
        enginMoteurService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
