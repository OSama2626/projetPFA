package ma.project.civ.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SiteProductionDTO {
    private Long id;
    @NotBlank
    private String nom;
}
