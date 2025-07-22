package ma.project.civ.services.organigramme;


import lombok.AllArgsConstructor;
import ma.project.civ.entities.organigramme.Centre;
import ma.project.civ.repositories.organigramme.CentreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor

public class CentreServiceImp implements CentreService {
    private final CentreRepository centreRepository;


    public List<Centre> getAllCentre() {
        return centreRepository.findAll();
    }


    public Centre getCentreById(UUID id){
        return null;
    }


    public Centre createCentre(Centre centre){
        return null;
    }
}
