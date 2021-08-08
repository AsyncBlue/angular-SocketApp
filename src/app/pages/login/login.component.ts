import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  nombre: string = '';

  constructor( public wsService: WebsocketService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  ingresar() {
    this.wsService.loginWS( this.nombre )
      .then( () => {
        this.router.navigateByUrl('/mensajes');
      });
  }

}
