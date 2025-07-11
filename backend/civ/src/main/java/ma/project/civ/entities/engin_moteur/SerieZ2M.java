package ma.project.civ.entities.engin_moteur;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("SerieZ2M")
public class SerieZ2M extends EnginMoteurHabilitation {

}