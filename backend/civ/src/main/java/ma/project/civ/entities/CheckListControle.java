package ma.project.civ.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckListControle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String designationDOC;
    private Date dateApplication;
    private Date editionDOC;
    private int version;
    private int rectificatifs;
    private String criteresControles;

    @OneToOne
    @JoinColumn(name = "controle_a_priori_id")
    private ControleAPriori controleAPriori;

@OneToOne
@JoinColumn(name = "controle_sur_vif_id")
private ControleSurVif controleSurVif;
}
