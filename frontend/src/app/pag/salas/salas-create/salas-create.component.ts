import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
}

@Component({
  selector: 'app-salas-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './salas-create.component.html',
  styleUrl: './salas-create.component.css'
})
export class SalasCreateComponent {

  nombre: string = "";
  asiento: number = 0; // Inicializar asiento con un valor nulo
  inicio: string = ''; // Inicializar inicio con un valor nulo
  final: string = "";
  tipo: string = "";
  nombreControl = new FormControl(''); // Crear un FormControl para el combobox
  
  formGroup: FormGroup | undefined;

  currentClienteID = "";

  cities: City[] | undefined;
  selectedCity: City | undefined;

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

    this.getPeliculas();

  }

  ngOnInit(): void {
  }

  getAllCliente() {
    this.http.get("http://127.0.0.1:8000/api/admins").subscribe((resultData: any)=> {
        console.log(resultData);
    });
  }

  onComboboxChange(event: any) {
    if (event.target.value === 'Premium'){
      this.asiento = 50;
      this.tipo = event.target.value; // Asignar el valor seleccionado a la variable nombre
    }else{
      this.tipo = event.target.value; // Asignar el valor seleccionado a la variable nombre
      this.asiento = 100;
    }
  }

  register() {  

    let bodyData = {
      "nombre": this.nombre,
      "asiento": this.asiento,
      "inicio": this.inicio,
      "final": this.final,
      "tipo": this.tipo,
      "disponible": this.asiento,
      "pelicula": this.selectedCity?.name,
    };

    console.log(bodyData);

    this.http.post("http://127.0.0.1:8000/api/sala", bodyData).subscribe((resultData: any) => {
      console.log("Registro Exitoso");
      alert("Usuario registrado con exito");
      this.getAllCliente();
      this.nombre = '';
      this.asiento = 0;
      this.inicio = "";
      this.final = "";
      this.router.navigateByUrl('./')
    })
  }

  saveCliente() {
    if(this.currentClienteID == '') {
      this.register();
    }
  }

  getPeliculas() {
    this.http.get<any[]>("http://127.0.0.1:8000/api/peliculas").subscribe((resultData: any[]) => {
      this.cities = resultData.map((obj: any) => ({ name: obj.nombre}));
    });

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });
  }
  
  onCityChange(event: any) {
    this.selectedCity = event.value;
  }
  
}
