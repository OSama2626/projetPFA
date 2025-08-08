package ma.project.civ.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class EtablissementCreateRequest {
    @NotEmpty
    private String nom;
}
