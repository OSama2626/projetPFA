package ma.project.civ.services;

import ma.project.civ.dto.SiteProductionDTO;

import java.util.List;

public interface SiteProductionService {
    List<SiteProductionDTO> findAll();
    SiteProductionDTO findById(Long id);
    SiteProductionDTO save(SiteProductionDTO siteProductionDTO);
    SiteProductionDTO update(Long id, SiteProductionDTO siteProductionDTO);
    void deleteById(Long id);
}
