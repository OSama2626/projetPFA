package ma.project.civ.mapper;

import ma.project.civ.dto.KN3DTO;
import ma.project.civ.entities.users.KN3;
import org.springframework.beans.BeanUtils;

public class KN3Mapper {

    public static KN3 toEntity(KN3DTO dto) {
        KN3 entity = new KN3();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }

    public static KN3DTO toDto(KN3 entity) {
        KN3DTO dto = new KN3DTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
}
