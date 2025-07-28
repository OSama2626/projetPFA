package ma.project.civ.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CheckListControleDTO {
    private Long id;
    private String designationDOC;
    private Date dateApplication;
    private Date editionDOC;
    private int version;
    private int rectificatifs;
    private String criteresControles;
}
