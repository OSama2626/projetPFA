package ma.project.civ.entities.organigramme;

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
public class Etablissement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom" , nullable = false , unique = true)
    private String nom;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Centre> centres = new HashSet<>();
}
