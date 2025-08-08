package ma.project.civ.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DepartementCreateRequest {
    @NotEmpty
    private String nom;
}
