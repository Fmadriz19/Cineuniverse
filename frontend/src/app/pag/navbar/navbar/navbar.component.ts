import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  admin = true;
  showModal = false;

  constructor( private router: Router, private http: HttpClient){

  }

  ngOnInit(): void {
    this.verificarSesion();
    this.getUser();
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  registro(){
    this.router.navigateByUrl('/registre');
  }

  cerrarSesion(){
    localStorage.clear();
    this.verificarSesion();
    this.getUser();
    location.reload();
  }

  verificarSesion(){
    let userData = localStorage.getItem('userData');

    // Verificar si se encontró un valor en el localStorage
    if (userData) {
      // Convertir el valor de cadena a objeto JSON
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      let id = parsedUserData.id;
      let tipoUser = parsedUserData.tipoUser;
      console.log(id);
      console.log(tipoUser);
      this.showModal = false;
    } else {
      // No se encontró ningún valor en el localStorage
      this.showModal = true;
      console.log('No se encontró ningún dato en el localStorage');
    }
  }

  getUser(){

    let userData = localStorage.getItem('userData');

    // Verificar si se encontró un valor en el localStorage
    if (userData) {
      // Convertir el valor de cadena a objeto JSON
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      let tipoUser = parsedUserData.tipoUser;
      console.log(tipoUser);

      if (tipoUser == 1) {
        this.admin = true; // Retorna falso sintipoUser es igual a 1
      } else if (tipoUser == 0) {
        this.admin = false; // Retorna verdadero si tipoUser es igual a 0
      }
    } else {
      // No se encontró ningún valor en el localStorage
      this.admin= false;
      console.log('No se encontró ningún dato en el localStorage');
    }

  }
}
