package lk.ijse.dep11.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageTO implements Serializable {
    private String message;
    @NotEmpty(message = "Email can't be empty")
    @Email(message = "Invalid email")
    private String email;
}
