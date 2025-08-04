package ma.project.civ.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "check_list_controle") // Explicit table name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckListControle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "designation_doc", length = 255) // Added column definition
    private String designationDOC;

    @Column(name = "date_application")
    @Temporal(TemporalType.DATE) // Specify date precision
    private Date dateApplication;

    @Column(name = "edition_doc")
    @Temporal(TemporalType.DATE)
    private Date editionDOC;

    @Column(name = "version")
    private int version;

    @Column(name = "rectificatifs")
    private int rectificatifs;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "criteres_controles", columnDefinition = "jsonb") // For PostgreSQL
    private Map<String, Object> criteresControles;

    @OneToOne(fetch = FetchType.LAZY) // Added fetch type for performance
    @JoinColumn(name = "controle_a_priori_id")
    private ControleAPriori controleAPriori;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "controle_sur_vif_id")
    private ControleSurVif controleSurVif;
}
