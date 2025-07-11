package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.entities.organigramme.Etablissement;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("KN2")
public class KN2 extends UserApp{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "centre_kn2_id")
    private Centre centre;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "etablissement_kn2_id")
    private Etablissement etablissement;
}

