package ma.project.civ.dto.materiel;

import lombok.Data;

@Data
public class LigneDTO {
    private Long id;
    private String origine;
    private String destination;
    private Integer distance;
}
