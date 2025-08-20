package ma.project.civ.mapper;

import ma.project.civ.dto.SiteProductionDTO;
import ma.project.civ.entities.organigramme.SiteProductionHabilitation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SiteProductionMapper extends GenericMapper<SiteProductionHabilitation, SiteProductionDTO> {
}
