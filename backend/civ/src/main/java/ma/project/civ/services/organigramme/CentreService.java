package ma.project.civ.services.organigramme;

import ma.project.civ.entities.organigramme.Centre;


import java.util.List;
import java.util.UUID;

public interface CentreService {
    public List<Centre> getAllCentre();
    public Centre getCentreById(UUID id);
    public Centre createCentre(Centre centre);
}