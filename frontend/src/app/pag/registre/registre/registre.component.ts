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

  nombre: string = "";
  usuario: string = "";
  email: string = "";
  contrasena: string = "";
  contrasenaConfir: string = "";
  tipo: string = "0";
  
  validEmail = false;
  invalidEmail = false;
  regisEmail = false;
  userInvalid = false;
  contraConfir = false;
  validCamp = false;

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
      "nombre": this.nombre,
      "usuario": this.usuario,
      "correo": this.email,
      "contraseña": this.contrasena,
      "tipoUser": this.tipo,
    };

      this.http.post("http://127.0.0.1:8000/api/admin", bodyData).subscribe({
        next: (res: any) => {
          console.log(res)
          
          console.log("Registro Exitoso");
          alert("Usuario registrado con exito");
          this.getAllCliente();
          this.nombre = '';
          this.email = '';
          this.usuario = '';
          this.contrasena = '';
          this.contrasenaConfir = '';
          this.router.navigateByUrl('login');
        },
        error: (err: any) => {
          console.log(err.error.message);
          if (err.error.message == 'El nombre no puede estar vacio') {

          } else if (err.error.message === 'El correo debe ser de Gmail') {
            this.validEmail = false;
            this.validCamp = false;
          } else if (err.error.message === 'El correo ya está registrado') {
            this.validEmail = false;
            this.invalidEmail = false;
            this.validCamp = false;
            this.regisEmail = true;
          }
           else if (err.error.message === 'El usuario ya esta registrado') {
            this.validEmail = false;
            this.invalidEmail = false;
            this.regisEmail = false;
            this.validCamp = false;
            this.userInvalid = true;
          }
        }
      });

  }

  saveCliente() {
    if(this.currentClienteID == '') {
      this.register();
    }
  }

}