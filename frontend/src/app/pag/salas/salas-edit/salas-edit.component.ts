import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salas-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './salas-edit.component.html',
  styleUrl: './salas-edit.component.css'
})
export class SalasEditComponent {

  userID!: any;
  tipoUser!: any;
  admin!: any;
  nombreControl = new FormControl(''); // Crear un FormControl para el combobox
  tip: string = "";
  validEmail = false;
  invalidEmail = false;
  regisEmail = false;
  userInvalid = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
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
    this.userID = this.route.snapshot.paramMap.get('id');
    this.getUpdate();

  }

  ngOnInit(): void {
  }

  getUpdate(){
    this.http.get(`http://127.0.0.1:8000/api/sala/${this.userID}`).subscribe((data: any) => {
      this.admin = data;
      this.nombreControl.setValue(this.admin.tipo);
      console.log(this.admin);
    });
  }

  onComboboxChange(event: any) {
    this.tip = event.target.value; // Asignar el valor seleccionado a la variable nombre
  }

  actualizar() {  

    let bodyData = {
      nombre: this.admin.nombre,
      asiento: this.admin.asiento,
      inicio: this.admin.inicio,
      final: this.admin.final,
      tipo: this.tip,
    };

    console.log(bodyData);

    this.http.put(`http://127.0.0.1:8000/api/sala/${this.userID}`, bodyData).subscribe((resultData: any) => {
      console.log("Registro Exitoso");
      alert("Sala Actualizada con exito");
      this.router.navigateByUrl('/');

    })
  }

}
