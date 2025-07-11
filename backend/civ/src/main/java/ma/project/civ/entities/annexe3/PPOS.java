package ma.project.civ.entities.annexe3;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.civ.entities.annexe2.Critere;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PPOS {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "type")
    private String type;

    @Column(name = "designation")
    private String designation;

    @Column(name = "cotation")
    private String cotation;

//    @ManyToOne
//    @JoinColumn(name = "ppos_sef_sst_id")
//    private PPOS_SEF_SST ppos_sef_sst;

    @ManyToMany
    private List<Critere> criteres=new ArrayList<>();

}
