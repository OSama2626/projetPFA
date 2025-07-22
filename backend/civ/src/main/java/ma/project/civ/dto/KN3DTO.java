package ma.project.civ.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class KN3DTO extends UserAppDTO {
    private Long etablissementId;
}
