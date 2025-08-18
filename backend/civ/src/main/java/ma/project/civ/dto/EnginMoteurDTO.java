package ma.project.civ.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnginMoteurDTO {
    private Long id;
    @NotBlank
    private String serie;
    @NotNull
    private Integer numero;
    @NotBlank
    private String type;
}
