package ma.project.civ.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Version {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numero;

    private String objet;

    private Timestamp date_d_entree_en_vigueur;

}
