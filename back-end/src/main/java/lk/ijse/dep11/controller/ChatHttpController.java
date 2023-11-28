package lk.ijse.dep11.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@RequestMapping("/api/v2/messages")
@CrossOrigin
public class ChatHttpController {

    private final List<String> chatMessages = new Vector<>();

    @GetMapping(produces = "application/json")
    public List<String> retrieveMessages(){return chatMessages;}

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Map<String, String> sendMessages(@RequestBody Map<
                                            @Pattern(regexp = "^messageS", message = "Invalid chat message") String,
                                            @NotBlank(message = "Chat message can't be empty") String> messageObj) {
        chatMessages.add(messageObj.get("message"));
        return messageObj;
    }
}
