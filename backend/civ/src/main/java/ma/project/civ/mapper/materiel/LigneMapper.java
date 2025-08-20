package ma.project.civ.mapper.materiel;

import ma.project.civ.dto.materiel.LigneDTO;
import ma.project.civ.entities.materiel.Ligne;
import ma.project.civ.mapper.GenericMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LigneMapper extends GenericMapper<Ligne, LigneDTO> {
}
