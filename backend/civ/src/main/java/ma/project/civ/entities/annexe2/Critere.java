package ma.project.civ.entities.annexe2;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import ma.project.civ.entities.annexe3.PPOS;
//import ma.project.civ.entities.annexe4.PPOP;
//
//import java.util.ArrayList;
//import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Critere {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reponse")
    private String reponse;

    @Column(name = "coeficient")
    private Integer coeficient;

//    @ManyToMany(mappedBy = "criteres")
//    private List<PR> prs=new ArrayList<>();
//
//    @ManyToMany(mappedBy = "criteres")
//    private List<PPOS> ppos=new ArrayList<>();
//
//    @ManyToMany(mappedBy = "criteres")
//    private List<PPOP> ppop=new ArrayList<>();


}
