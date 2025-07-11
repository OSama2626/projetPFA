package ma.project.civ.entities.annexe5;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CGPXFormation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mois")
    private Integer mois ;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<PlanCGPXFormation> planCGPXFormations = new HashSet<>();

//    @ManyToOne
//    @JoinColumn(name = "planning_trimestriel_id")
//    private PlaningTrimestrielControleRegulierKN1 planningTrimestriel;

}
