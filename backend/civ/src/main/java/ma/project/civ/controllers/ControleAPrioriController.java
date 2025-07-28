package ma.project.civ.controllers;

import ma.project.civ.dto.ControleAPrioriDTO;
import ma.project.civ.mapper.ControleAPrioriMapper;
import ma.project.civ.services.ControleAPrioriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/controle-a-priori")
public class ControleAPrioriController {

    @Autowired
    private ControleAPrioriService controleAPrioriService;

    @Autowired
    private ControleAPrioriMapper controleAPrioriMapper;

    @PostMapping
    public ControleAPrioriDTO save(@RequestBody ControleAPrioriDTO controleAPrioriDTO) {
        return controleAPrioriMapper.toDto(controleAPrioriService.save(controleAPrioriMapper.toEntity(controleAPrioriDTO)));
    }

    @GetMapping
    public List<ControleAPrioriDTO> findAll() {
        return controleAPrioriMapper.toDto(controleAPrioriService.findAll());
    }

    @GetMapping("/filter")
    public List<ControleAPrioriDTO> findByFilter(@RequestParam int annee,
                                                 @RequestParam String trimestre,
                                                 @RequestParam String etablissement,
                                                 @RequestParam String centre,
                                                 @RequestParam String antenne) {
        return controleAPrioriMapper.toDto(controleAPrioriService.findByFilter(annee, trimestre, etablissement, centre, antenne));
    }
}
