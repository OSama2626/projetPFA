package ma.project.civ.mapper;

import ma.project.civ.dto.ControleAPrioriDTO;
import ma.project.civ.entities.ControleAPriori;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ControleAPrioriMapper extends GenericMapper<ControleAPriori, ControleAPrioriDTO> {
}
