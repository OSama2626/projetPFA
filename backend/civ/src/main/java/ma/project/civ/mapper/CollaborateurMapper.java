//package ma.project.civ.mapper;
//
//import ma.project.civ.dto.CollaborateurDTO;
//import ma.project.civ.entities.collaborateurs.Collaborateur;
//import ma.project.civ.repositories.collaborateurs.DateFiabiliteHumaineRepository;
//import ma.project.civ.repositories.engin_moteur.EnginMoteurHabilitationRepository;
//import ma.project.civ.repositories.organigramme.DepartementRepository;
//import ma.project.civ.repositories.organigramme.LigneHabilitationRepository;
//import ma.project.civ.repositories.organigramme.ServiceRepository;
//import ma.project.civ.repositories.organigramme.SiteProductionHabilitationRepository;
//import ma.project.civ.repositories.users.KN1Repository;
//import ma.project.civ.repositories.users.KN2Repository;
//import ma.project.civ.repositories.users.KN3Repository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.stereotype.Component;
//
//import java.util.stream.Collectors;
//
//@Component
//public class CollaborateurMapper {
//
//    private final SiteProductionHabilitationRepository siteProductionHabilitationRepository;
//    private final LigneHabilitationRepository ligneHabilitationRepository;
//    private final DepartementRepository departementRepository;
//    private final ServiceRepository serviceRepository;
//    private final DateFiabiliteHumaineRepository dateFiabiliteHumaineRepository;
//    private final EnginMoteurHabilitationRepository enginMoteurHabilitationRepository;
//    private final KN1Repository kn1Repository;
//    private final KN2Repository kn2Repository;
//    private final KN3Repository kn3Repository;
//
//    public CollaborateurMapper(SiteProductionHabilitationRepository siteProductionHabilitationRepository, LigneHabilitationRepository ligneHabilitationRepository, DepartementRepository departementRepository, ServiceRepository serviceRepository, DateFiabiliteHumaineRepository dateFiabiliteHumaineRepository, EnginMoteurHabilitationRepository enginMoteurHabilitationRepository, KN1Repository kn1Repository, KN2Repository kn2Repository, KN3Repository kn3Repository) {
//        this.siteProductionHabilitationRepository = siteProductionHabilitationRepository;
//        this.ligneHabilitationRepository = ligneHabilitationRepository;
//        this.departementRepository = departementRepository;
//        this.serviceRepository = serviceRepository;
//        this.dateFiabiliteHumaineRepository = dateFiabiliteHumaineRepository;
//        this.enginMoteurHabilitationRepository = enginMoteurHabilitationRepository;
//        this.kn1Repository = kn1Repository;
//        this.kn2Repository = kn2Repository;
//        this.kn3Repository = kn3Repository;
//    }
//
//    public Collaborateur toEntity(CollaborateurDTO dto) {
//        Collaborateur entity = new Collaborateur();
//        BeanUtils.copyProperties(dto, entity);
//
//        if (dto.getSiteProductionHabilitations() != null) {
//            entity.setSiteProductionHabilitations(dto.getSiteProductionHabilitations().stream()
//                    .map(siteProductionHabilitationRepository::findById)
//                    .map(optional -> optional.orElse(null))
//                    .collect(Collectors.toSet()));
//        }
//
//        if (dto.getLigneHabilitations() != null) {
//            entity.setLigneHabilitations(dto.getLigneHabilitations().stream()
//                    .map(ligneHabilitationRepository::findById)
//                    .map(optional -> optional.orElse(null))
//                    .collect(Collectors.toSet()));
//        }
//
//        if (dto.getDepartementId() != null) {
//            entity.setDepartement(departementRepository.findById(dto.getDepartementId()).orElse(null));
//        }
//
//        if (dto.getServiceId() != null) {
//            entity.setService(serviceRepository.findById(dto.getServiceId()).orElse(null));
//        }
//
//        if (dto.getDateFiabiliteHumaineId() != null) {
//            entity.setDateFiabiliteHumaine(dateFiabiliteHumaineRepository.findById(dto.getDateFiabiliteHumaineId()).orElse(null));
//        }
//
//        if (dto.getEnginMoteurHabilitations() != null) {
//            entity.setEnginMoteurHabilitations(dto.getEnginMoteurHabilitations().stream()
//                    .map(enginMoteurHabilitationRepository::findById)
//                    .map(optional -> optional.orElse(null))
//                    .collect(Collectors.toSet()));
//        }
//
//        if (dto.getKn1Id() != null) {
//            entity.setKn1(kn1Repository.findById(dto.getKn1Id()).orElse(null));
//        }
//
//        if (dto.getKn2Id() != null) {
//            entity.setKn2(kn2Repository.findById(dto.getKn2Id()).orElse(null));
//        }
//
//        if (dto.getChef_service_planification_id() != null) {
//            entity.setChef_service_planification(kn3Repository.findById(dto.getChef_service_planification_id()).orElse(null));
//        }
//
//        if (dto.getChef_etablissement_id() != null) {
//            entity.setChef_etablissement(kn3Repository.findById(dto.getChef_etablissement_id()).orElse(null));
//        }
//
//        return entity;
//    }
//
//    public CollaborateurDTO toDto(Collaborateur entity) {
//        CollaborateurDTO dto = new CollaborateurDTO();
//        BeanUtils.copyProperties(entity, dto);
//        return dto;
//    }
//}
