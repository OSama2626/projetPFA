package ma.project.civ.controllers;

import ma.project.civ.dto.ControleSurVifDTO;
import ma.project.civ.mapper.ControleSurVifMapper;
import ma.project.civ.services.ControleSurVifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/controle-sur-vif")
public class ControleSurVifController {

    @Autowired
    private ControleSurVifService controleSurVifService;

    @Autowired
    private ControleSurVifMapper controleSurVifMapper;

    @PostMapping
    public ControleSurVifDTO save(@RequestBody ControleSurVifDTO controleSurVifDTO) {
        return controleSurVifMapper.toDto(controleSurVifService.save(controleSurVifMapper.toEntity(controleSurVifDTO)));
    }

    @GetMapping
    public List<ControleSurVifDTO> findAll() {
        return controleSurVifMapper.toDto(controleSurVifService.findAll());
    }

    @GetMapping("/filter")
    public List<ControleSurVifDTO> findByFilter(@RequestParam int annee,
                                                  @RequestParam String trimestre,
                                                  @RequestParam String etablissement,
                                                  @RequestParam String centre,
                                                  @RequestParam String antenne) {
        return controleSurVifMapper.toDto(controleSurVifService.findByFilter(annee, trimestre, etablissement, centre, antenne));
    }
}
