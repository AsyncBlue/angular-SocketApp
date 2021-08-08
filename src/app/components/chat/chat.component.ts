import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  mensajeSubscription!: Subscription;
  elemento!: HTMLElement;
  mensajes: any[] = [];

  constructor( private chatService: ChatService ) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes')!;

    this.mensajeSubscription = this.chatService.getMessages().subscribe( msg => {
      this.mensajes.push( msg );
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50)
    });

  }

  enviar() {
    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

  ngOnDestroy(): void {
    this.mensajeSubscription.unsubscribe();
  }

}
