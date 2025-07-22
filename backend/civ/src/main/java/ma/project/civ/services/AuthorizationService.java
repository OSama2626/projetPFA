package ma.project.civ.services;

import org.springframework.security.core.Authentication;

public interface AuthorizationService {
    public boolean isAdmin(Authentication authentication);
    public boolean isAdminEtablissement(Authentication authentication);
    public boolean isInspection(Authentication authentication);
    public boolean isKN1(Authentication authentication);
    public boolean isKN2(Authentication authentication);
    public boolean isKN3(Authentication authentication);
    public boolean isInspecteur(Authentication authentication);
}
