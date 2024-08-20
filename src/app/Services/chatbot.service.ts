import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.au-syd.assistant.watson.cloud.ibm.com/instances/<instance_id>/v2/assistants/<assistant_id>/message';

  private apiKey = 'NvMC-85kerqfpxK-Gh_Kp-t7VMLHYhIbaBEjGXJODSpR';
  private version = '2022-02-24'; // Change to your version date

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('apikey:' + this.apiKey)}`
    });

    const data = {
      input: {
        text: message
      },
      session_id: 'eca5ceff-ace4-4391-92c2-8b76b5dcf3f6' // Get or generate a session ID from Watson
    };

    return this.http.post<any>(`${this.apiUrl}?version=${this.version}`, data, { headers });
  }
}
