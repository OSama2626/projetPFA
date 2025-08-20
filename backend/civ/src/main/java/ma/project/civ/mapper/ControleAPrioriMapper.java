package ma.project.civ.mapper;

import ma.project.civ.dto.ControleAPrioriDTO;
import ma.project.civ.entities.ControleAPriori;
import org.mapstruct.Mapper;

// Add the new mapper to the 'uses' list
@Mapper(componentModel = "spring", uses = {ProcedureMapper.class, CheckListControleMapper.class})
public interface ControleAPrioriMapper extends GenericMapper<ControleAPriori, ControleAPrioriDTO> {

    @Override
    ControleAPriori toEntity(ControleAPrioriDTO dto);

    @Override
    ControleAPrioriDTO toDto(ControleAPriori entity);
}