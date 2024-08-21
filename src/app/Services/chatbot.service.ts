import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private url = 'https://dialogflow.googleapis.com/v2/projects/angularbot-srqp/agent/sessions/<VOTRE_SESSION_ID>:detectIntent';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    const body = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'fr',
        },
      },
    };

    return this.http.post(this.url, body);
  }
}
