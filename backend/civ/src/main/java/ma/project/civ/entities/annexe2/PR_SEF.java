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
public class PR_SEF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note")
    private Double note;

//    @OneToOne(mappedBy = "pr_sef")
//    @JoinColumn(name = "controle_a_priori_id")
//    private ControlePrioriKn1 controlePrioriKn1;
//
//    @OneToOne(mappedBy = "pr_sef")
//    @JoinColumn(name = "controle_sur_vif_id")
//    private ControleVifKn1 controleVifKn1;

    @OneToMany(fetch = FetchType.EAGER)
    private List<PR> prs = new ArrayList<>();





}
