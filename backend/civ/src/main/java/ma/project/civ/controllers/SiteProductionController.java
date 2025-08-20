package ma.project.civ.controllers;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.SiteProductionDTO;
import ma.project.civ.services.SiteProductionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/site-productions")
@RequiredArgsConstructor
public class SiteProductionController {

    private final SiteProductionService siteProductionService;

    @GetMapping
    public ResponseEntity<List<SiteProductionDTO>> getAllSiteProductions() {
        return ResponseEntity.ok(siteProductionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteProductionDTO> getSiteProductionById(@PathVariable Long id) {
        return ResponseEntity.ok(siteProductionService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SiteProductionDTO> createSiteProduction(@RequestBody SiteProductionDTO siteProductionDTO) {
        return new ResponseEntity<>(siteProductionService.save(siteProductionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SiteProductionDTO> updateSiteProduction(@PathVariable Long id, @RequestBody SiteProductionDTO siteProductionDTO) {
        return ResponseEntity.ok(siteProductionService.update(id, siteProductionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiteProduction(@PathVariable Long id) {
        siteProductionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
