import { DatePipe, NgClass, NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ref, set, Database, onValue, query, orderByChild, limitToLast, push, update } from '@angular/fire/database';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputGroupModule } from 'primeng/inputgroup';
import { ScrollerModule } from 'primeng/scroller';
import { SplitterModule } from 'primeng/splitter';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-chatting',
  imports: [SplitterModule, DataViewModule, NgClass, ScrollerModule, InputGroupModule, ButtonModule, TextareaModule, FormsModule, DatePipe, ScrollPanelModule],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.scss'
})
export class ChattingComponent implements OnInit, AfterViewInit {
  // USELESS
  @ViewChild('chatPanel', { static: false }) chatPanelRef!: ElementRef;

  chats: any[] = []
  chatMessages: any[] = [];
  chatIdSelected: string = '';
  chatNameSelected: string = '';
  inputChat: string = '';
  iteration: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private db = inject(Database)
  constructor() { }

  ngOnInit(): void {
    this.getAllChat()
  }

  ngAfterViewInit(): void {

  }

  selectChat(chatId: string, chatName: string) {
    this.chatIdSelected = chatId;
    this.chatNameSelected = chatName;
    this.getChatMessages(chatId);

    // USELESS
    setTimeout(() => {
      const scrollElem = this.chatPanelRef?.nativeElement?.querySelector('.p-scrollpanel-content');
      if (scrollElem) {
        scrollElem.scrollTop = scrollElem.scrollHeight;
      }
    }, 1000);
  }

  getChatMessages(chatId: string) {
    const chatMsgRef = ref(this.db, `/messages/${chatId}`);
    const chatMsgQuery = query(chatMsgRef, limitToLast(50));

    onValue(chatMsgQuery, (snapshot) => {
      const data = snapshot.val();
      const messages = data
        ? Object.entries(data).map(([key, value]: any) => ({ id: key, ...value }))
        : [];
      this.chatMessages = messages
    })
  }

  getAllChat() {
    const chatsRef = ref(this.db, '/chats');
    const chatsQuery = query(chatsRef, orderByChild('createdAt'));

    onValue(chatsQuery, (snapshot) => {
      const chatsData: { key: string | null; data: any }[] = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        chatsData.push({ key, data });
        chatsData.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.chats = chatsData.map(chat => ({
          id: chat.key,
          customer: chat.data.customer,
          lastMessage: chat.data.lastMessage,
          createdAt: chat.data.createdAt
        }));

      })
    })
  }

  async sendMessage(chatId: string) {
    const msgRef = ref(this.db, `/messages/${chatId}`)
    const messageData = {
      sender: 'admin',
      message: this.inputChat,
      timestamp: Date.now()
    }

    await push(msgRef, messageData).then(
      () => {
        const chatRef = ref(this.db, `/chats/${chatId}`);
        const updateLastMessage = {
          sender: 'customer',
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
    );;
    // Update the last message in the chat
    // set(ref(this.db, `/chats/${chatId}`), {
    //   sender: 'admin',
    //   lastMessage: this.inputChat,
    //   createdAt: Date.now()
    // }).then(() => this.inputChat = '');
  }

  addChat() {
    set(
      ref(this.db, `/chats/${this.getRandomString()}`),
      {
        customer: 'sayang cek',
        lastMessage: this.inputChat,
        createdAt: Date.now()
      }
    ).then(
      () => {
        this.inputChat = ''
      }
    )
  }

  getRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  limitString(value: string, limit: number): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
