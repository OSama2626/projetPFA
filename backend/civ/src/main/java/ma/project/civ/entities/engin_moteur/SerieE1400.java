package ma.project.civ.entities.engin_moteur;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("SerieE1400")
public class SerieE1400 extends EnginMoteurHabilitation {

}
