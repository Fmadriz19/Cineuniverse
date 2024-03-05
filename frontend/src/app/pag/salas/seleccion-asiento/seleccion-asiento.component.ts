import { CantidadServiceService } from '../../../services/cantidad-service.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { HttpClient } from '@angular/common/http';

const TOTAL_SECONDS = 2 * 60;

interface Servicio {
  cantidad: number;
  priceTicket: number;
  web: number;
  servicio: number;
  base: number;
  iva: number;
  totalUSD: number;
  total: number;
}

@Component({
  selector: 'app-seleccion-asiento',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule, ButtonModule, CheckboxModule, ChipModule],
  templateUrl: './seleccion-asiento.component.html',
  styleUrl: './seleccion-asiento.component.css'
})
export class SeleccionAsientoComponent implements OnInit {

  servicios!: any;

  // Temporizador
  minutos: string = '';
  segundos: string = '';
  totalSeconds: number = TOTAL_SECONDS;
  timerId: any;
  timer: number = 120;

  secondsCircle: HTMLElement | null = null;
  minutesCircle: HTMLElement | null = null;

  timerActive: boolean = false;

  // asientos comprados
  comprados: any[] = [];
  agregarClaseHola: boolean = false;

  // Lista de texto de columna y fila
  filas: any[] = [
    { name: 'H' },
    { name: 'G' },
    { name: 'F' },
    { name: 'E' },
    { name: 'D' },
    { name: 'C' },
    { name: 'B' },
    { name: 'A' }
  ];

  columnas: any[] = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' }
  ];

  // Listas de las filas

  asientos_7: any[] = [
    { key: 'A-1' },
    { key: 'A-2' },
    { key: 'A-3' },
    { key: 'A-4' },
    { key: 'A-5' },
    { key: 'A-6' },
    { key: 'A-7' },
    { key: 'A-8' }
  ];

  asientos_6: any[] = [
    { key: 'B-1' },
    { key: 'B-2' },
    { key: 'B-3' },
    { key: 'B-4' },
    { key: 'B-5' },
    { key: 'B-6' },
    { key: 'B-7' },
    { key: 'B-8' }
  ];

  asientos_5: any[] = [
    { key: 'C-1' },
    { key: 'C-2' },
    { key: 'C-3' },
    { key: 'C-4' },
    { key: 'C-5' },
    { key: 'C-6' },
    { key: 'C-7' },
    { key: 'C-8' }
  ];

  asientos_4: any[] = [
    { key: 'D-1' },
    { key: 'D-2' },
    { key: 'D-3' },
    { key: 'D-4' },
    { key: 'D-5' },
    { key: 'D-6' },
    { key: 'D-7' },
    { key: 'D-8' }
  ];

  asientos_3: any[] = [
    { key: 'E-1' },
    { key: 'E-2' },
    { key: 'E-3' },
    { key: 'E-4' },
    { key: 'E-5' },
    { key: 'E-6' },
    { key: 'E-7' },
    { key: 'E-8' }
  ];

  asientos_2: any[] = [
    { key: 'F-1' },
    { key: 'F-2' },
    { key: 'F-3' },
    { key: 'F-4' },
    { key: 'F-5' },
    { key: 'F-6' },
    { key: 'F-7' },
    { key: 'F-8' }
  ];

  categories: any[] = [
    { key: 'G-1' },
    { key: 'G-2' },
    { key: 'G-3' },
    { key: 'G-4' },
    { key: 'G-5' },
    { key: 'G-6' },
    { key: 'G-7' },
    { key: 'G-8' }
  ];

  // Lista de asientos seleccionado de esa fila
  selectedCategories: any[] = [];

  // Cantidad a seleccionar
  seleCant: number = 0;

  // Variables de las api exportadas
  peliID!: any;
  peli!: any;
  salaID!: any;
  sala!: any;
  compradoID!: any;
  userID!: any;
  admin!: any;

  compradosID!: any;

  // Asientos elegidos pero separados 
  asientosSelec!: any;
  puestosSelec!: any;

  constructor(private router: Router, private cantidadService: CantidadServiceService, private elementRef: ElementRef,
    private readonly activatedRoute: ActivatedRoute, private http: HttpClient) {

    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      this.userID = parsedUserData.id;
      this.getUpdate();
    } else {
      console.log('El usuario no está logueado');
      this.router.navigateByUrl('');
    }

    this.peliID = this.activatedRoute.snapshot.params['id1'];
    this.salaID = this.activatedRoute.snapshot.params['id2'];


    this.getApi();
    this.countdown();
  }

  ngOnInit(): void {
    this.servicios = this.cantidadService.getServicios();
    this.seleCant = this.servicios.cantidad;
    console.log(this.servicios);


    if (this.servicios.cantidad === undefined) {
      this.router.navigateByUrl(`/tickets/${this.peliID}`);
    } else {
      this.seleCant = this.servicios.cantidad;

    }



  }

  ngAfterViewInit() {
    this.secondsCircle = this.elementRef.nativeElement.querySelector('#seconds_circle');
    this.minutesCircle = this.elementRef.nativeElement.querySelector('#minutes_circle');

    if (this.secondsCircle) {
      this.secondsCircle.style.strokeDashoffset = '0';
    }

    if (this.minutesCircle) {
      this.minutesCircle.style.strokeDashoffset = '500';
    }

  }

  // Extrae el cliente
  getUpdate() {
    this.http.get(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      this.admin = data;
    });
  }

  // Extraer de la api
  getApi() {
    // Pelicula
    this.http.get(`http://127.0.0.1:8000/api/pelicula/${this.peliID}`).subscribe((data: any) => {
      this.peli = data;
    });

    // Sala
    this.http.get(`http://127.0.0.1:8000/api/sala/${this.salaID}`).subscribe((data: any) => {
      this.sala = data;
      this.ocupados();

    });
  }

  visual() {
    console.log(this.selectedCategories);
  }

  // Funciones para la seleccion de asiento y cambiar el color
  isSelected(category: any): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleSelection(category: any) {

    if (this.isSelected(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      console.log(this.selectedCategories);

      this.seleCant++;
    }
    else {
      if (this.seleCant > 0) {
        this.selectedCategories.push(category);
        console.log(this.selectedCategories);
        this.seleCant--;
      }
    }

  }

  // Si encuentra coincidencia cambia de color y no permite que seleccione
  esCoincidencia(category: any): boolean {
    for (const comprado of this.comprados) {
      const claveComprado = comprado.key;
      const claveCategoria = category.key;

      if (claveComprado === claveCategoria) {
        return true;

      }
    }

    return false;
  }

  // Temporizador
  countdown() {
    this.timerId = setInterval(() => {
      if (this.totalSeconds <= 0) {
        clearInterval(this.timerId);
        this.secondsCircle?.classList.add("wq");
        this.minutesCircle?.classList.add("wq");
        this.displayTime();
      }
      this.displayTime();
      this.totalSeconds -= 1;
    }, 1000);
  }


  displayTime() {
    const seconds = this.totalSeconds % 60;
    const minutes = Math.floor((this.totalSeconds - seconds) / 60);
    const secondsCircle = 500 - ((seconds / 60) * 500);
    const minutesCircle = 500 - (((this.timer - this.totalSeconds) / this.timer) * 500);

    this.minutos = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    this.segundos = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    if (this.secondsCircle) {
      this.secondsCircle.style.strokeDashoffset = `${secondsCircle}`;

      if (this.totalSeconds > (this.timer * 0.1) && this.totalSeconds <= (this.timer * 0.5)) {
        this.secondsCircle.style.stroke = '#FFF017';
      }
      else if (this.totalSeconds <= this.timer * 0.1) {
        this.secondsCircle.style.stroke = '#C9140F';
      }
    }

    if (this.minutesCircle) {
      this.minutesCircle.style.strokeDashoffset = `${minutesCircle}`;

      if (this.totalSeconds > (this.timer * 0.1) && this.totalSeconds <= (this.timer * 0.5)) {
        this.minutesCircle.style.stroke = '#FFF017';
      }
      else if (this.totalSeconds <= this.timer * 0.1) {
        this.minutesCircle.style.stroke = '#C9140F';
      }
    }

  }

  // Asientos comprados
  ocupados() {
    const ocupados = this.sala.comprados;

    const codigos: string[] = ocupados.split('/');

    for (let i = 0; i < codigos.length; i++) {
      this.comprados.push({ key: codigos[i] });
    }

    console.log(codigos);

  }

  // Boton de continuar
  continuar() {
    const keys = this.selectedCategories.map((item) => item.key);

    let valor = '';

    for (let num = 0; num < keys.length; num++) {
      if (num === 0) {
        valor = keys[num];
      } else {
        valor += `/${keys[num]}`;
      }

    }

    if (this.sala.comprados === null) {
      this.asientosSelec = valor;
      this.enviarComprados();
      console.log(this.asientosSelec);
    }
    else {
      this.asientosSelec = `${this.sala.comprados}/${valor}`;
      this.puestosSelec = valor;
      console.log(this.asientosSelec);
      this.enviarComprados();
    }


  }

  enviarComprados() {

    let body = {
      asientos: this.puestosSelec,
      sala: this.sala.nombre,
      cliente: this.admin.usuario,
      pelicula: this.peli.nombre,
      horario: this.sala.inicio,
    }

    this.http.post(`http://127.0.0.1:8000/api/comprado`, body).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('registrado con exito');
        this.enviarCorreo();
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    });

    console.log(body);

  }

  enviarCorreo() {

    let body = {
      asientos: this.puestosSelec,
      sala: this.sala.nombre,
      cliente: this.admin.usuario,
      pelicula: this.peli.nombre,
      horario: this.sala.inicio,
      web: this.servicios.web,
      servicio: this.servicios.servicio,
      base: this.servicios.base,
      iva: this.servicios.iva,
      totalUSD: this.servicios.totalUSD,
      total: this.servicios.total,
    }

    console.log(body);


    this.http.post(`http://127.0.0.1:8000/api/envio`, body).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('Correo enviado con exito');
        /* this.actualizarSala(); 
          RECUERDA CAMBIARLE LA CLASE DEL ONCLICK AL BOTON A enviarComprados()

        */
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })

  }

  actualizarSala() {

    let cantDisponible = this.sala.disponible - this.seleCant;

    let actualizarDisponible = this.sala.asiento;

    var body = {
      nombre: this.sala.nombre,
      asiento: this.sala.asiento,
      inicio: this.sala.inicio,
      final: this.sala.final,
      tipo: this.sala.tipo,
      disponible: cantDisponible,
      pelicula: this.sala.pelicula,
      comprados: this.asientosSelec,
    }

    this.http.put(`http://127.0.0.1:8000/api/sala/${this.salaID}`, body).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('actualizado con exito');
        this.router.navigateByUrl('');
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    });

    console.log(body);
  }


}
