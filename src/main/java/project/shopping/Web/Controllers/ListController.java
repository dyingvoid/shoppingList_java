package project.shopping.Web.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.shopping.Data.Entitites.ShoppingItem;
import project.shopping.Data.Repositories.ShoppingItemRepository;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/lists")
public class ListController {
    private final ShoppingItemRepository items;

    @Autowired
    public ListController(ShoppingItemRepository items) {
        this.items = items;
    }

    @GetMapping
    public List<ShoppingItem> getAll() {
        return items.findAll();
    }

    @PostMapping
    public void addItem(@Valid @RequestBody ShoppingItem newItem) {
        Optional<ShoppingItem> item = items.findById(newItem.getName());

        if (item.isPresent()) {
            ShoppingItem value = item.get();
            value.setAmount(value.getAmount() + newItem.getAmount());
            items.save(value);
        } else {
            items.save(newItem);
        }
    }

    @PutMapping("{name}")
    public void changeBought(@PathVariable String name) {
        Optional<ShoppingItem> item = items.findById(name);
        item.ifPresent(value -> value.setBought(!value.isBought()));
    }

    @DeleteMapping("{name}")
    public void deleteItem(@PathVariable String name) {
        Optional<ShoppingItem> item = items.findById(name);
        item.ifPresent(items::delete);
    }
}
