package ma.project.civ.entities.organigramme;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.collaborateurs.Collaborateur;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nom", nullable = false, unique = true)
    private String nom;

    @ManyToOne
    @JoinColumn(name = "departement_id")
    private Departement departement;

//    @OneToMany(mappedBy = "service")
//    private Set<Collaborateur> collaborateurs = new HashSet<>();
}
