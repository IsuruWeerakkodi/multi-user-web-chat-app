package lk.ijse.dep11.wscontroller;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lk.ijse.dep11.to.MessageTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Vector;

public class ChatWSController extends TextWebSocketHandler {
    private List<MessageTO> chatMessage = new Vector<>();
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private LocalValidatorFactoryBean validatorFactoryBean;

    private final List<WebSocketSession> webSocketSessionList = new ArrayList<>();

    public ChatWSController(/*ObjectMapper objectMapper*/) {
        System.out.println("ChatWSController");
//        this.objectMapper = objectMapper;
    }
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println(session);
        System.out.println(message);
        session.sendMessage(new TextMessage("Hello i am from server"));
        try{
            //@RequestBody
            MessageTO messageObj = mapper.readValue(message.getPayload(), MessageTO.class);
            //@Valid
            Set<ConstraintViolation<MessageTO>> violations = validatorFactoryBean.getValidator().validate(messageObj);
            if (violations.isEmpty()){
                //broadcast message to other clients
                for (WebSocketSession webSocketSession : webSocketSessionList) {
                    if (webSocketSession==session) continue;
                    webSocketSession.sendMessage(new TextMessage(message.getPayload()));
                }
            } else {
//                for (ConstraintViolation<MessageTO> violation : violations) {
//                    System.out.println(violation.getMessage());
//                }
                session.sendMessage(new TextMessage("invalid message schema"));

            }
        } catch (JacksonException e) {
            session.sendMessage(new TextMessage("Invalid JSON"));
        }

        //chatMessage.add(message.getPayload());   //payload give a json
    }
}
