import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario!: Usuario | null;

  constructor( private socket: Socket, private router: Router ) {

    this.cargarStorage();
    this.checkStatus();

  }

  checkStatus() {
    this.socket.on( 'connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on( 'disconnect', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }

  loginWS( nombre: string ) {
    
    return new Promise( ( resolve, reject ) => {
      
      this.emit( 'configurar-usuario', { nombre }, ( resp: any ) => {
        this.usuario = new Usuario( nombre );
        this.guardarStorage();
        resolve(resp);
      });

    });

  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem( 'usuario' );
    const payload = {
      nombre: 'Sin Nombre'
    }
    this.emit( 'configurar-usuario', payload, () => {} );
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );
  }

  cargarStorage() {
    if ( localStorage.getItem( 'usuario' ) ) {
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' )! );
      this.loginWS( this.usuario!.nombre );
    }
  }

}
