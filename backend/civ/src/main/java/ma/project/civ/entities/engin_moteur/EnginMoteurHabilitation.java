package ma.project.civ.entities.engin_moteur;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "MOTEUR_TYPE" , discriminatorType = DiscriminatorType.STRING)
public abstract class EnginMoteurHabilitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_de_serie")
    private String serie;

    @Column(name = "numero")
    private Integer numero;


    public String getDiscriminatorValue() {
        DiscriminatorValue annotation = this.getClass().getAnnotation(DiscriminatorValue.class);
        return (annotation != null) ? annotation.value() : null;
    }
}
