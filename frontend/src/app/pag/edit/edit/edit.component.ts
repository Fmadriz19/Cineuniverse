import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  userID!: any;
  tipoUser!: any;
  admin!: any;
  email: string='';
  password: string='';

  constructor(private http: HttpClient) { }

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

  actualizar(){
    var inputData ={
      nombre: this.admin.nombre,
      apellido: this.admin.apellido,
      cedula: this.admin.cedula,
      imagen: this.admin.imagen,
      correo: this.admin.correo,
      direccion: this.admin.direccion,
      pais: this.admin.pais,
      estado: this.admin.estado,
      ciudad: this.admin.ciudad,
      telefono: this.admin.telefono,
    }

    this.http.put(`http://127.0.0.1:8000/api/admin/${this.userID}`, inputData).subscribe({
      next: (res: any) => {
        console.log(res)
        alert('Usuario Actualizado')
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }
}
