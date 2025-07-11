package ma.project.civ.entities.annexe4;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PPOP_SEF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note")
    private Double note;

//    @OneToOne
//    @JoinColumn(name = "controle_posteriori_id")
//    private ControlePosterioriKn1 controlePosterioriKn1;

    @OneToMany(fetch = FetchType.EAGER)
    private List<PPOP> ppop = new ArrayList<>();
}
