package project.shopping.Web.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.shopping.Data.Entitites.ShoppingItem;
import project.shopping.Data.Entitites.ShoppingList;
import project.shopping.Data.Repositories.ShoppingItemRepository;
import project.shopping.Data.Repositories.ShoppingListRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lists")
public class ListController {
    private final ShoppingListRepository lists;
    private final ShoppingItemRepository items;

    @Autowired
    public ListController(ShoppingListRepository lists, ShoppingItemRepository items) {
        this.lists = lists;
        this.items = items;
    }

    @GetMapping
    public List<ShoppingList> findAll(){
        return lists.findAll();
    }

    @PostMapping
    public void addNewList(@Valid @RequestBody ShoppingList list) {
        lists.save(list);
    }

    @DeleteMapping("{id}")
    public List<ShoppingList> deleteListById(@PathVariable Long id){
        lists.deleteById(id);
        return lists.findAll();
    }

    @PostMapping("{id}")
    public ResponseEntity<ShoppingList> addItemToList(@PathVariable Long id, @Valid @RequestBody ShoppingItem item){
        Optional<ShoppingList> optional = lists.findById(id);

        if(optional.isEmpty())
            return ResponseEntity.notFound().build();

        ShoppingList list = optional.get();
        item.setList(list);

        items.save(item);
        return ResponseEntity.ok(list);
    }
}
