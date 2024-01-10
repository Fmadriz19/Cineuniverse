import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminServiceService } from '../../../services/admin-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string='';
  password: string='';
  emailError: any; 
  passwordError: any;
  
  validEmail = false;
  invalidEmail = false;
  validPassword = false;
  invalidPassword = false;
  showModal = false;
  reload = false;

  constructor( private router: Router, private route: ActivatedRoute, private adminService: AdminServiceService, private http: HttpClient, private elementRef: ElementRef) { 

    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      this.router.navigateByUrl('/');
    } else {
      console.log('El usuario no está logueado');
    }

  }

  ngOnInit() {
  }

  login(){    
    let inputData = {
      "email": this.email,
      "password": this.password,
    }

    this.http.post("http://127.0.0.1:8000/api/admin/login", inputData).subscribe({
      next: (res: any) => {
        localStorage.setItem('userData', JSON.stringify(res));
        console.log(res)
        alert('Inicio de sesion completa')
        location.reload();
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        console.log(err.error.message);
        if (err.error.message == 'El correo no puede estar vacio') {
          this.validEmail = true;
        } else if (err.error.message === 'El correo debe ser de Gmail') {
          this.validEmail = false;
          this.invalidEmail = true;
        } else if (err.error.message === 'La contrasena no puede estar vacía') {
          this.validEmail = false;
          this.invalidEmail = false;
          this.validPassword = true;
        } else if (err.error.message === 'La contrasena debe tener al menos 6 caracteres') {
          this.validEmail = false;
          this.invalidEmail = false;
          this.validPassword = false;
          this.invalidPassword = true;
        } else if (err.error.message === 'El correo y la contrasena no coinciden') {
          this.validEmail = false;
          this.invalidEmail = false;
          this.validPassword = false;
          this.invalidPassword = false;
          this.showModal = true;
        }
      }
    });
  }

  accion(){
    this.reload = true;
    this.ejecutarAccion();
  }

  ejecutarAccion() {
    setTimeout(() => {
      // Coloca aquí la acción que deseas ejecutar después de 2 segundos
      this.reload = false;
      this.login();
    }, 4000); // 2000 milisegundos = 2 segundos
  }

  acceso(){
    this.router.navigateByUrl('registre');
  }

  //    Funcion para cambiar el tipo de los input de contraseña de password a text
  ngAfterViewInit() {
    const togglePassword = this.elementRef.nativeElement.querySelector('#togglePassword');
    const passwordInput = this.elementRef.nativeElement.querySelector('#inputPassword');

    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
    });
  }
}
