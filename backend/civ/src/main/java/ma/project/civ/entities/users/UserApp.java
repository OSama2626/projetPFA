package ma.project.civ.entities.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "USER_TYPE" , discriminatorType = DiscriminatorType.STRING)
public abstract class UserApp {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "matricule", unique = true , nullable = false)
    private String matricule;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true , nullable = false)
    private String email;

    @Column(name = "fonction" )
    private String fonction;


    public String getDiscriminatorValue() {
        DiscriminatorValue annotation = this.getClass().getAnnotation(DiscriminatorValue.class);
        return (annotation != null) ? annotation.value() : null;
    }
}
