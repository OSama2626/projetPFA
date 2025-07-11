package ma.project.civ.entities.annexe2;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DOC {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "designation")
    private String designation;

    @Column(name = "nombre_de_rectificatifs")
    private Integer nombre_de_rectificatifs;

    @Column(name = "criteres_de_controle")
    private String criteres_de_controle;

    @Column(name = "cotation")
    private String cotation;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "date")
    private Timestamp date;

//    @ManyToOne
//    @JoinColumn(name = "check_List_Controle_DOC_id")
//    private CheckListControleDOC checkListControleDOC;
}
