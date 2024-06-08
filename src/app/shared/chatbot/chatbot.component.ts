import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('expandChatbot', [
      state(
        'collapsed',
        style({
          width: '50px',
          borderRadius: '50%',
        })
      ),
      state(
        'expanded',
        style({
          width: '300px',
          borderRadius: '5px',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatbox') private chatbox!: ElementRef<HTMLUListElement>;
  showChat = false;
  chatbotState: 'collapsed' | 'expanded' = 'collapsed';
  userMessage: string = '';
  chatMessages: { sender: string; message: string }[] = [];

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.chatbox && this.chatbox.nativeElement) {
      this.scrollToBottom();
    }
  }

  toggleChatbot(): void {
    this.chatbotState = this.chatbotState === 'collapsed' ? 'expanded' : 'collapsed';
    this.showChat = !this.showChat;
  }

  sendMessage(): void {
    if (this.userMessage.trim() !== '') {
      const userMessage = { role: 'user', content: this.userMessage };
      this.chatMessages.push({ sender: 'You', message: this.userMessage });

      this.handlerAskGPT(userMessage);

      // Clear the input field
      this.userMessage = '';
    }
  }

  private handlerAskGPT(userMessage: any): void {
    const url = 'https://api.openai.com/v1/chat/completions';
    const httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer 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')
      .set('Content-Type', 'application/json');

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
    };

    this.httpClient.post(url, payload, { headers: httpHeaders }).subscribe({
      next: (resp: any) => {
        const botResponse = { sender: 'Chatbot', message: resp.choices[0].message.content };
        this.chatMessages.push(botResponse);
      },
      error: (err: any) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  private scrollToBottom(): void {
    try {
      this.renderer.setProperty(this.chatbox.nativeElement, 'scrollDown', this.chatbox.nativeElement.scrollHeight);
    } catch (err) {
      console.error(err);
    }
  }
}
