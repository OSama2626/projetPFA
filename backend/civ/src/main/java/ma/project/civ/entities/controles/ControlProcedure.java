package ma.project.civ.entities.controles;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ControlProcedure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numeroPPOP;
    private String designationPPOP;
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Map<String, Object>> criteresDeControle;
    private int coefficient;
    @ManyToOne
    @JoinColumn(name = "controle_aposteriori_id")
    private ControleAPosteriori controleAPosteriori;
}
