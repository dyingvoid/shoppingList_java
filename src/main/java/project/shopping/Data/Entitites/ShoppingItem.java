package project.shopping.Data.Entitites;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class ShoppingItem {
    @Id
    @NotBlank
    private String name;

    @Min(1)
    private int amount = 1;

    private boolean isBought = false;
}
