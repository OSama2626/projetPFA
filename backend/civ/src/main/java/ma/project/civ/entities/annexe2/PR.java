package ma.project.civ.entities.annexe2;

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
public class PR {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "designation")
    private String designation;

    @Column(name = "cotation")
    private String cotation;

//    @ManyToOne
//    @JoinColumn(name = "pr_sef_id")
//    private PR_SEF pr_sef;

    @ManyToMany
    private List<Critere> criteres=new ArrayList<>();


}
