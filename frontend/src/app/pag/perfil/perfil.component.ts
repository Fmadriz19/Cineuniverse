import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  providers: [NgModule],
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  userID!: any;
  tipoUser!: any;
  admin!: any;
  email: string='';
  password: string='';

  constructor(private http: HttpClient, private router: Router) { 
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      
    } else {
      console.log('El usuario no está logueado');
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){

    let userData = localStorage.getItem('userData');

    // Verificar si se encontró un valor en el localStorage
    if (userData) {
      // Convertir el valor de cadena a objeto JSON
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      this.userID = parsedUserData.id;
      this.tipoUser = parsedUserData.tipoUser;
      console.log(this.userID);
      console.log(this.tipoUser);
      this.getUpdate();
    } else {
      // No se encontró ningún valor en el localStorage
      console.log('No se encontró ningún dato en el localStorage');
    }
  }

  getUpdate(){
    this.http.get(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      this.admin = data;
      console.log(this.admin);
    });
  }

  getborrar(){
    this.http.delete(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      console.log(data);
      localStorage.clear();
      this.router.navigateByUrl('');
    });
  }
}
