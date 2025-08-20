package ma.project.civ.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class PPOPDTO {
    private Long id;
    private int numeroPPOP;
    private String designationPPOP;
    private List<Map<String, Object>> criteresDeControle;
    private int coefficient;
}