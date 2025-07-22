package ma.project.civ.mapper;

import ma.project.civ.dto.KN1DTO;
import ma.project.civ.entities.users.KN1;
import org.springframework.beans.BeanUtils;

public class KN1Mapper {

    public static KN1 toEntity(KN1DTO dto) {
        KN1 entity = new KN1();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }

    public static KN1DTO toDto(KN1 entity) {
        KN1DTO dto = new KN1DTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
}
