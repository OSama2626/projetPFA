package ma.project.civ.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping(value = {"/", "/{path:^(?!api|assets|static).*}/**"})
    public String forward() {
        return "forward:/index.html";
    }
}
