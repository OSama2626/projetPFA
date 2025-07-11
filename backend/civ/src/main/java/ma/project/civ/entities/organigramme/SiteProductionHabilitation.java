package ma.project.civ.entities.organigramme;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.collaborateurs.Collaborateur;

import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SiteProductionHabilitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @ManyToMany(mappedBy = "siteProductionHabilitations")
    private Set<Collaborateur> collaborateurs = new HashSet<>();
}
