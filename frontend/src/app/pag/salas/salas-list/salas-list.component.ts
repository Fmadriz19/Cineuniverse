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
