package ma.project.civ.mapper;

import ma.project.civ.dto.KN2DTO;
import ma.project.civ.entities.users.KN2;
import org.springframework.beans.BeanUtils;

public class KN2Mapper {

    public static KN2 toEntity(KN2DTO dto) {
        KN2 entity = new KN2();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }

    public static KN2DTO toDto(KN2 entity) {
        KN2DTO dto = new KN2DTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
}
