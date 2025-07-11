package ma.project.civ.entities.annexe3;

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
public class PPOS_SEF_SST {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note")
    private Double note;

//    @OneToOne
//    @JoinColumn(name = "controle_sur_vif_id")
//    private ControleVifKn1 controleVifKn1;

    @OneToMany(fetch = FetchType.EAGER)
    private List<PPOS> ppos = new ArrayList<>();



}
