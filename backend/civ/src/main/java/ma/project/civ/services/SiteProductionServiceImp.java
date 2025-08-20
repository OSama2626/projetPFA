package ma.project.civ.services;

import lombok.RequiredArgsConstructor;
import ma.project.civ.dto.SiteProductionDTO;
import ma.project.civ.entities.organigramme.SiteProductionHabilitation;
import ma.project.civ.mapper.SiteProductionMapper;
import ma.project.civ.repositories.organigramme.SiteProductionHabilitationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SiteProductionServiceImp implements SiteProductionService {

    private final SiteProductionHabilitationRepository siteProductionRepository;
    private final SiteProductionMapper siteProductionMapper;

    @Override
    public List<SiteProductionDTO> findAll() {
        return siteProductionRepository.findAll()
                .stream()
                .map(siteProductionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SiteProductionDTO findById(Long id) {
        SiteProductionHabilitation siteProduction = siteProductionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SiteProduction not found"));
        return siteProductionMapper.toDTO(siteProduction);
    }

    @Override
    public SiteProductionDTO save(SiteProductionDTO siteProductionDTO) {
        SiteProductionHabilitation siteProduction = siteProductionMapper.toEntity(siteProductionDTO);
        SiteProductionHabilitation savedSiteProduction = siteProductionRepository.save(siteProduction);
        return siteProductionMapper.toDTO(savedSiteProduction);
    }

    @Override
    public SiteProductionDTO update(Long id, SiteProductionDTO siteProductionDTO) {
        SiteProductionHabilitation existingSiteProduction = siteProductionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SiteProduction not found"));
        existingSiteProduction.setNom(siteProductionDTO.getNom());
        SiteProductionHabilitation updatedSiteProduction = siteProductionRepository.save(existingSiteProduction);
        return siteProductionMapper.toDTO(updatedSiteProduction);
    }

    @Override
    public void deleteById(Long id) {
        siteProductionRepository.deleteById(id);
    }
}
