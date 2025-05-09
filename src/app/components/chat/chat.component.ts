  import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import {GameService} from '../../../services/game.service';

  @Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
  })
  export class ChatComponent {
    @Input() gameId!: string;
    @Input() chatHistory: string = '';


    messageInput: string = '';
    @ViewChild('chatContainer') chatContainer!: ElementRef;
    @Input() nickname: string = '';


    constructor(private gameService: GameService) {
    }

    sendMessage(): void {
      const text = this.messageInput.trim();
      if (!text) return;

      const payload = {player: this.nickname, text};

      this.gameService.sendMessages(this.gameId, payload).subscribe({
        next: () => {
          this.messageInput = '';
        },
        error: err => console.error('Error in chat component', err)
      });
    }



    onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    }

  }
