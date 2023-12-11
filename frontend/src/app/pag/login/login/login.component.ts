import { Component, OnInit } from '@angular/core';
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

  constructor( private router: Router, private route: ActivatedRoute, private adminService: AdminServiceService, private http: HttpClient) { 

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

  
/* 


 */
}
