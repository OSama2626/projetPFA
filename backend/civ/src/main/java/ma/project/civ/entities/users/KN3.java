package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.project.civ.entities.organigramme.Etablissement;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("KN3")
public class KN3 extends UserApp{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "etablissement_kn3_id")
    private Etablissement etablissement;
}
