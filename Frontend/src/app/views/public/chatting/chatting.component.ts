import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/admin/auth.service';
import { ref, set, Database, onValue, query, limitToLast, push, update } from '@angular/fire/database';
import { last } from 'rxjs';

@Component({
  selector: 'app-chatting',
  imports: [ScrollPanelModule, DatePipe, TextareaModule, ButtonModule, FormsModule],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.scss'
})
export class ChattingComponent implements OnInit {
  messages: any[] = [];
  inputChat: string = '';
  customerId: string = '';
  customerName: string = '';

  private db = inject(Database)
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decodedToken: any = this.authService.decodedToken(token ?? '')
    this.customerId = decodedToken?.customerId;
    this.customerName = decodedToken?.customerName;

    this.getChatMessages(this.customerId);
  }

  async sendMessage(chatId: string) {
    const msgRef = ref(this.db, `/messages/${chatId}`)
    const messageData = {
      sender: 'customer',
      message: this.inputChat,
      timestamp: Date.now()
    }

    await push(msgRef, messageData).then(
      () => {
        const chatRef = ref(this.db, `/chats/${chatId}`);
        const updateLastMessage = {
          sender: 'customer',
          customer: this.customerName,
          lastMessage: this.inputChat,
          createdAt: Date.now()
        }

        // Update the chat with the last message
        update(
          chatRef,
          updateLastMessage
        ).then(() => {
          this.inputChat = '';
        });
      }
    );
  }

  getChatMessages(chatId: string) {
    const chatMsgRef = ref(this.db, `/messages/${chatId}`);
    const chatMsgQuery = query(chatMsgRef, limitToLast(50));

    onValue(chatMsgQuery, (snapshot) => {
      const data = snapshot.val();
      const messages = data
        ? Object.entries(data).map(([key, value]: any) => ({ id: key, ...value }))
        : [];
      this.messages = messages
    })
  }
}
