package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.project.civ.entities.organigramme.Departement;
import ma.project.civ.entities.organigramme.Service;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("INSPECTION")
public class Inspection extends UserApp{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service_inspection_id")
    private Service service;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "departement_inspection_id")
    private Departement departement;


}
