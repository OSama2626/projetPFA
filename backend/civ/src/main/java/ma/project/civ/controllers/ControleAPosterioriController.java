package ma.project.civ.controllers;

import ma.project.civ.dto.ControleAPosterioriDTO;
import ma.project.civ.services.ControleAPosterioriService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/controles-aposteriori")
@CrossOrigin(origins = "*")
public class ControleAPosterioriController {

    private final ControleAPosterioriService controleAPosterioriService;

    public ControleAPosterioriController(ControleAPosterioriService controleAPosterioriService) {
        this.controleAPosterioriService = controleAPosterioriService;
    }

    @PostMapping
    public ControleAPosterioriDTO save(@RequestBody ControleAPosterioriDTO controleAPosterioriDTO) {
        return controleAPosterioriService.save(controleAPosterioriDTO);
    }

    @GetMapping
    public List<ControleAPosterioriDTO> findByFilter(
            @RequestParam int annee,
            @RequestParam(required = false) String trimestre,
            @RequestParam(required = false) String etablissement,
            @RequestParam(required = false) String centre,
            @RequestParam(required = false) String antenne) {
        return controleAPosterioriService.findByFilter(annee, trimestre, etablissement, centre, antenne);
    }
}
