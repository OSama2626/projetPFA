package ma.project.civ.entities.annexe2;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckListControleDOC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double note;

//    @OneToOne
//    @JoinColumn(name = "controle_a_priori_id")
//    private ControlePrioriKn1 controlePrioriKn1;
//
//    @OneToOne
//    @JoinColumn(name = "controle_sur_vif_id")
//    private ControleVifKn1 controleVifKn1;

    @OneToMany(fetch = FetchType.EAGER)
    private List<DOC> docs = new ArrayList<>();
}
