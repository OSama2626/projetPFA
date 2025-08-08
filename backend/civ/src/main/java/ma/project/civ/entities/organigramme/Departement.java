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
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false, unique = true)
    private String nom;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Service> services = new HashSet<>();

//    @OneToMany(mappedBy = "departement")
//    private Set<Collaborateur> collaborateurs = new HashSet<>();
}
