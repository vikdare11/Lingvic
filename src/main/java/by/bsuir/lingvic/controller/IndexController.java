package by.bsuir.lingvic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    /*@Autowired
    private MenuService menuService;

    @RequestMapping("/index")
    public ModelAndView getIndexPage(@ModelAttribute("topMenu")ArrayList<Menu> topMenu) {

        ModelAndView modelAndView = new ModelAndView("indexTemplate");

        topMenu = (ArrayList<Menu>) menuService.getTopMenu();
        modelAndView.addObject("topMenu", topMenu);

        return modelAndView;
    }*/
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
