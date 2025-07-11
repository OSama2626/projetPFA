package ma.project.civ.entities.engin_moteur;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("RGVM")
public class Rgvm extends EnginMoteurHabilitation{

}