package ma.project.civ.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class KN2DTO extends UserAppDTO {
    private Long etablissementId;
    private Long centreId;
}
