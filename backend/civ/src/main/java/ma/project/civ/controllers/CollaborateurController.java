package ma.project.civ.controllers;

import lombok.AllArgsConstructor;
import ma.project.civ.entities.collaborateurs.Collaborateur;
import ma.project.civ.services.CollaborateurService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/collaborateurs")
public class CollaborateurController {

    private final CollaborateurService collaborateurService;

    @PostMapping
    public Collaborateur createCollaborateur(@RequestBody Collaborateur collaborateur) {
        return collaborateurService.createCollaborateur(collaborateur);
    }
}
