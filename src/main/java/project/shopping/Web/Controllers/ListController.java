package project.shopping.Web.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.shopping.Data.Entitites.ShoppingList;
import project.shopping.Data.Repositories.ShoppingListRepository;

import java.util.List;

@RestController
@RequestMapping("/lists")
public class ListController {
    private final ShoppingListRepository repository;

    @Autowired
    public ListController(ShoppingListRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ShoppingList> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public List<ShoppingList> addNewList(@Valid @RequestBody ShoppingList list) {
        repository.save(list);
        return repository.findAll();
    }

    @DeleteMapping("{id}")
    public List<ShoppingList> deleteListById(@PathVariable Long id){
        repository.deleteById(id);
        return repository.findAll();
    }
}
