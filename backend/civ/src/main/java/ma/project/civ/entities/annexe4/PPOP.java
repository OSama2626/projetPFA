package ma.project.civ.entities.annexe4;

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
public class PPOP {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "ppop_sef_id")
//    private PPOP_SEF ppos_sef;

    @ManyToMany
    private List<Critere> criteres=new ArrayList<>();
}
