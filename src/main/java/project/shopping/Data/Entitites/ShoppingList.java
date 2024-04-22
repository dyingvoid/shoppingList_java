package project.shopping.Data.Entitites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class ShoppingList {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;
}
