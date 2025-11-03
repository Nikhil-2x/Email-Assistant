package com.smartEmail.EmailAssistant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    public final EmailGeneratorService emailGeneratorService;

    @GetMapping("/test")
    public ResponseEntity<String> res() {
        String test = "Working fine";
        return ResponseEntity.ok(test);
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {

        String response = emailGeneratorService.generateEmailReply(emailRequest);

        return ResponseEntity.ok(response);
    }
}
