import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './salas-edit.component.html',
  styleUrl: './salas-edit.component.css'
})
export class SalasEditComponent {


  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      let tipoUser = parsedUserData.tipoUser;
      console.log(tipoUser);

      if (tipoUser == 0) {
        this.router.navigateByUrl('');
      }
    } else {
      console.log('El usuario no está logueado');
      this.router.navigateByUrl('');
    }
  }
}
