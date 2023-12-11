import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-salas-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './salas-create.component.html',
  styleUrl: './salas-create.component.css'
})
export class SalasCreateComponent {

  nombre: string = "";
  asiento: number | null = null; // Inicializar asiento con un valor nulo
  inicio: string | null = null; // Inicializar inicio con un valor nulo
  final: string | null = null;
  tipo: string = "";
  nombreControl = new FormControl(''); // Crear un FormControl para el combobox

  currentClienteID = "";

  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit(): void {
  }

  getAllCliente() {
    this.http.get("http://127.0.0.1:8000/api/admins").subscribe((resultData: any)=> {
        console.log(resultData);
    });
  }

  onComboboxChange(event: any) {
    this.tipo = event.target.value; // Asignar el valor seleccionado a la variable nombre
  }

  register() {

    let bodyData = {
      "nombre": this.nombre,
      "usuario": this.asiento,
      "inicio": this.inicio,
      "final": this.final,
      "tipo": this.tipo,
    };

    this.http.post("http://127.0.0.1:8000/api/sala", bodyData).subscribe((resultData: any) => {
      console.log("Registro Exitoso");
      alert("Usuario registrado con exito");
      this.getAllCliente();
      this.nombre = '';
      this.asiento =null;
      this.inicio = null;
      this.final = null;
    })
  }

  saveCliente() {
    if(this.currentClienteID == '') {
      this.register();
    }
  }

}
