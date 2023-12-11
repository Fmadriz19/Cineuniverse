import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent implements OnInit{
  ClienteArray: any[] = [];

  first_name: string = "";
  usuario: string = "";
  email: string = "";
  contrasena: string = "";


  currentClienteID = "";

  constructor(private http: HttpClient, private router: Router) {
    this.getAllCliente();
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      this.router.navigateByUrl('/');
    } else {
      console.log('El usuario no está logueado');
    }

  }

  ngOnInit(): void {
  }

  getAllCliente() {
    this.http.get("http://127.0.0.1:8000/api/admins").subscribe((resultData: any)=> {
        console.log(resultData);
        this.ClienteArray = resultData;
    });
  }

  register() {

    let bodyData = {
      "nombre": this.first_name,
      "usuario": this.usuario,
      "correo": this.email,
      "contraseña": this.contrasena,
    };

    this.http.post("http://127.0.0.1:8000/api/admin", bodyData).subscribe((resultData: any) => {
      console.log("Registro Exitoso");
      alert("Usuario registrado con exito");
      this.getAllCliente();
      this.first_name = '';
      this.email = '';
      this.contrasena = '';
    })
  }

  saveCliente() {
    if(this.currentClienteID == '') {
      this.register();
    }
  }

}