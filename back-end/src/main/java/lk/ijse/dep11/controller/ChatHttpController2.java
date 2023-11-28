package lk.ijse.dep11.controller;

import lk.ijse.dep11.to.MessageTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Vector;

@RestController
@RequestMapping("/api/v2/messages")
@CrossOrigin
public class ChatHttpController2 {

    private final List<MessageTO> chatMessages = new Vector<>();

    @GetMapping(produces = "application/json")
    public List<MessageTO> retrieveMessages() {
        return chatMessages;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "application/json", produces = "application/json")
    public MessageTO sendMessage(@RequestBody @Valid MessageTO message){
        chatMessages.add(message);
        return message;
    }

}
