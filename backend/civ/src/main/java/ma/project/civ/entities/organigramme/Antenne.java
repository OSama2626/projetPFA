package ma.project.civ.entities.organigramme;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Antenne {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom" , nullable = false , unique = true)
    private String nom;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;
}
