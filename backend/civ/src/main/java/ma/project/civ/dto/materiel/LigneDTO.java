package ma.project.civ.dto.materiel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LigneDTO {
    private Long id;
    @NotBlank
    private String origine;
    @NotBlank
    private String destination;
    @NotNull
    private Integer distance;
}
