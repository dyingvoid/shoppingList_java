package project.shopping.Data.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.shopping.Data.Entitites.ShoppingList;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
}
