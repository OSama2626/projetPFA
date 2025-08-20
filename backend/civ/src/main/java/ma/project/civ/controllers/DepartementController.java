package ma.project.civ.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.project.civ.dto.DepartementCreateRequest;
import ma.project.civ.dto.DepartementDTO;
import ma.project.civ.entities.organigramme.Departement;
import ma.project.civ.mapper.DepartementMapper;
import ma.project.civ.services.organigramme.DepartementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/departements")
public class DepartementController {

    private final DepartementService departementService;
    private final DepartementMapper departementMapper;

    @GetMapping
    public ResponseEntity<List<DepartementDTO>> getAll() {
        List<DepartementDTO> departementDTOs = departementService.getAllDepartements();
        return ResponseEntity.ok(departementDTOs);
    }

    @PostMapping
    public ResponseEntity<DepartementDTO> createDepartement(@Valid @RequestBody DepartementCreateRequest request) {
        Departement departement = new Departement();
        departement.setNom(request.getNom());

        Departement savedDepartement = departementService.save(departement);
        return new ResponseEntity<>(departementMapper.toDto(savedDepartement), HttpStatus.CREATED);
    }
}
