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
public class PlanCGPXFormation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "collaborateur_id")
    private Collaborateur collaborateur;

    @Column(name = "controle_Preori")
    private Integer controle_Pr;

    @Column(name = "controle_Vif_ACC")
    private Integer controle_Vif_ACC;

    @Column(name = "controle_Vif_TR")
    private Integer controle_Vif_TR;

    @Column(name = "controle_Posteriori_BG")
    private Integer controle_Post_BG;

    @Column(name = "controle_Posteriori_ER")
    private Integer controle_Post_ER;

//    @ManyToOne
//    @JoinColumn(name = "cgpxFormation_id")
//    private CGPXFormation cgpxFormation;
}
