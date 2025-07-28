package ma.project.civ.entities.controles;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Procedure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numeroPPOP;
    private String designationPPOP;
    private String criteresDeControle;
    private int coefficient;
    @ManyToOne
    @JoinColumn(name = "controle_aposteriori_id")
    private ControleAPosteriori controleAPosteriori;
}
