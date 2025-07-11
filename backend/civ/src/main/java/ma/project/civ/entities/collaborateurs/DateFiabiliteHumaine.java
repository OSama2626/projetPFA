package ma.project.civ.entities.collaborateurs;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DateFiabiliteHumaine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "dateFiabiliteHumaine")
    private Collaborateur collaborateur;

    @Column(name = "date_passage_psychotechnique")
    private Timestamp date_passage_psychotechnique;

    @Column(name = "date_visite_medicale")
    private Timestamp date_visite_medicale;

    @Column(name = "date_exp_psychotechnique")
    private Timestamp date_exp_psychotechnique;

    @Column(name = "date_exp_medicale")
    private Timestamp date_exp_medicale;

    @Column(name = "date_habilitation")
    private Timestamp date_habilitation;

    @Column(name = "date_maintien_habilitation")
    private Timestamp date_maintien_habilitation;

    @Column(name = "date_exp_maintien_habilitation")
    private Timestamp date_exp_maintien_habilitation;

    @Column(name = "date_retrait_provisoire")
    private Timestamp date_retrait_provisoire;

    @Column(name = "date_reintegration")
    private Timestamp date_reintegration;

    @Column(name = "date_retrait_definitif")
    private Timestamp date_retrait_definitif;

}
