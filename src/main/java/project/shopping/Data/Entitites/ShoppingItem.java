package project.shopping.Data.Entitites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class ShoppingItem {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @Min(1)
    private int amount;

    @ManyToOne
    private ShoppingList list;
}
