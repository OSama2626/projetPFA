package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.project.civ.entities.organigramme.Etablissement;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("ADMIN_ETABLISSEMENT")
public class AdminEtablissement extends UserApp {
//    @ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etablissement_admin_id")
    private Etablissement etablissement;
}
