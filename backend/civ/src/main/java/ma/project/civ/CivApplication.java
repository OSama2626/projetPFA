package ma.project.civ;

import ma.project.civ.repositories.organigramme.EtablissementRepository;
import ma.project.civ.repositories.users.*;
import ma.project.civ.entities.users.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CivApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivApplication.class, args);
    }

    @Bean
    CommandLineRunner run(AdminRepository adminRepository,
            AdminEtablissementRepository adminEtablissementRepository,
            InspectionRepository inspectionRepository,
            KN1Repository kn1Repository,
            KN2Repository kn2Repository,
            KN3Repository kn3Repository,
            PasswordEncoder passwordEncoder,
            EtablissementRepository etablissementRepository) {
        return args -> {

            // adminEtablissementRepository.deleteById(UUID.fromString("a4e9601b-5c28-437b-a47f-d8e46f4f3567"));

            // Etablissement etablissement = new Etablissement();
            // etablissement.setNom("etablissement_1");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_2");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_3");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_4");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_5");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_6");
            // etablissementRepository.save(etablissement);
            // etablissement = new Etablissement();
            // etablissement.setNom("etablissement_7");
            // etablissementRepository.save(etablissement);

//             Admin user = new Admin();
//             user.setMatricule("admin1");
//             user.setPassword(passwordEncoder.encode("1234"));
//             user.setNom("test1");
//             user.setPrenom("test1");
//             user.setEmail("<EMAIL11>");
//             adminRepository.save(user);

            // AdminEtablissement user1 = new AdminEtablissement();
            // user1.setMatricule("admin_etablissementA6");
            // user1.setPassword(passwordEncoder.encode("1234"));
            // user1.setNom("test");
            // user1.setPrenom("test");
            // user1.setEmail("<EMAILA6>");
            // user1.setFonction("ctl");
            // Etablissement etablissement = etablissementRepository.findById(1L).get();
            // user1.setEtablissement(etablissement);
            // adminEtablissementRepository.save(user1);
            //
            // user1 = new AdminEtablissement();
            // user1.setMatricule("admin_etablissementA2");
            // user1.setPassword(passwordEncoder.encode("1234"));
            // user1.setNom("test");
            // user1.setPrenom("test");
            // user1.setEmail("<EMAILA2>");
            // user1.setEtablissement(etablissementRepository.findById(1L).get());
            // adminEtablissementRepository.save(user1);
            //
            // user1 = new AdminEtablissement();
            // user1.setMatricule("admin_etablissementA3");
            // user1.setPassword(passwordEncoder.encode("1234"));
            // user1.setNom("test");
            // user1.setPrenom("test");
            // user1.setEmail("<EMAILA3>");
            // user1.setEtablissement(etablissementRepository.findById(1L).get());
            // adminEtablissementRepository.save(user1);
            //
            // user1 = new AdminEtablissement();
            // user1.setMatricule("admin_etablissementA4");
            // user1.setPassword(passwordEncoder.encode("1234"));
            // user1.setNom("test");
            // user1.setPrenom("test");
            // user1.setEmail("<EMAILA4>");
            // user1.setEtablissement(etablissementRepository.findById(2L).get());
            // adminEtablissementRepository.save(user1);
            //
            // user1 = new AdminEtablissement();
            // user1.setMatricule("admin_etablissementA5");
            // user1.setPassword(passwordEncoder.encode("1234"));
            // user1.setNom("test");
            // user1.setPrenom("test");
            // user1.setEmail("<EMAILA5>");
            // user1.setEtablissement(etablissementRepository.findById(2L).get());
            // adminEtablissementRepository.save(user1);
            //

            // System.out.println(etablissementRepository.findById(1L).get());
            // System.out.println(etablissementRepository.findById(2L).get());
            // System.out.println(etablissementRepository.findById(3L).get());
            // System.out.println(etablissementRepository.findById(4L).get());
            // System.out.println(etablissementRepository.findById(5L).get());
            // System.out.println(etablissementRepository.findById(6L).get());
            // Inspection user2 = new Inspection();
            // user2.setMatricule("inspection");
            // user2.setPassword(passwordEncoder.encode("1234"));
            // user2.setNom("test");
            // user2.setPrenom("test");
            // user2.setEmail("<EMAIL2>");
            // inspectionRepository.save(user2);
            //
            // KN1 user3 = new KN1();
            // user3.setMatricule("kn1");
            // user3.setPassword(passwordEncoder.encode("1234"));
            // user3.setNom("test");
            // user3.setPrenom("test");
            // user3.setEmail("<EMAIL3>");
            // kn1Repository.save(user3);
            //
            // KN2 user4 = new KN2();
            // user4.setMatricule("kn2");
            // user4.setPassword(passwordEncoder.encode("1234"));
            // user4.setNom("test");
            // user4.setPrenom("test");
            // user4.setEmail("<EMAIL4>");
            // kn2Repository.save(user4);
            //
            // KN3 user5 = new KN3();
            // user5.setMatricule("kn3");
            // user5.setPassword(passwordEncoder.encode("1234"));
            // user5.setNom("test");
            // user5.setPrenom("test");
            // user5.setEmail("<EMAIL5>");
            // kn3Repository.save(user5);

        };

    }
}
