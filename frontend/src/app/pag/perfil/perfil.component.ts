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
  valor = 0
  porcentaje = 0;
  ImageUrl: string | undefined;


  constructor(private http: HttpClient, private router: Router) { 
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      
    } else {
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
      this.getUpdate();
      
    } else {
      // No se encontró ningún valor en el localStorage
      console.log('No se encontró ningún dato en el localStorage');
    }
  }

  //    Extrayendo los datos del cliente

  getUpdate(){
    this.http.get(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      this.admin = data;

      let count = 0; // Variable to store the count of elements with values
    Object.keys(this.admin).forEach(key => {
      if (this.admin[key]) {
        count += 1;
      }

      this.getImg();
    });

    this.valor += count; // Update the valor variable with the count of elements with values
    this.completeDate();

    });
  }

  getImg(){
    if (this.admin && this.admin.imagen) {
      let file = this.admin.imagen;
      console.log(file);
      // Obtiene el archivo de imagen del input
      this.ImageUrl = file;
    } else {
      console.log('La propiedad imagen no está disponible en el objeto admin.');
      this.ImageUrl = 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'
    }
  }

  //    funcion redireccionar para Editar los datos del cliente

  getEdit(){
    this.router.navigateByUrl('clientes/edit');
  }

  //    Funcion de eliminar cuenta del cliente

  getborrar(){
    this.http.delete(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      localStorage.clear();
      this.router.navigateByUrl('');
    });
  }

  //    Funcion de eliminar la imagen del cliente

  getborrarImg(){
    
  }

  //    Calcular el porcentaje de los datos completos del cliente
  completeDate(){
    this.valor -= 5;
    const resultado = ((this.valor / 11) * 100).toFixed(2);
    this.porcentaje = parseFloat(resultado);

    const box = document.querySelector('.box') as HTMLElement;

    // Modificar el valor de --i
    if (box) {
      box.style.setProperty('--i', this.porcentaje + '%');
    }

    // Modificar el valor de h2
    const h2Element = document.querySelector('.circle h2');
    if (h2Element) {
      h2Element.textContent = this.porcentaje + '%';
    }
  }

}
