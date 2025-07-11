package ma.project.civ.entities.annexe5;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.collaborateurs.Collaborateur;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanCGPXTraction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "collaborateur_id")
    private Collaborateur collaborateur;

    @Column(name = "controle_Preori")
    private Integer controle_Pr;

    @Column(name = "controle_Vif_CCS")
    private Integer controle_Vif_CCS;

    @Column(name = "controle_Vif_CPS")
    private Integer controle_Vif_CPS;

//    @ManyToOne
//    @JoinColumn(name = "cgpxTraction_id")
//    private CGPXTraction cgpxTraction;

}
