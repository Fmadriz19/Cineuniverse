import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalaEntidad } from '../dto/sala-entidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas-list',
  standalone: true,
  imports: [],
  templateUrl: './salas-list.component.html',
  styleUrl: './salas-list.component.css'
})
export class SalasListComponent {

  
  SalasArray: any[] = [];

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

    this.getAllCliente();

  }

  getAllCliente() {
    this.http.get("http://127.0.0.1:8000/api/salas").subscribe((resultData: any)=> {
        //console.log(resultData);
        this.SalasArray = resultData;
        console.log(this.SalasArray);
    });
  }

  crear(){
    this.router.navigateByUrl('/salas/create');
  }

  BorrarSala(sala: SalaEntidad): void{
    this.http.delete(`http://127.0.0.1:8000/api/sala/${sala.id}`).subscribe((resultData: any)=> {
      //console.log(resultData);
      this.SalasArray = resultData;
      this.getAllCliente();
  });
  }

}
