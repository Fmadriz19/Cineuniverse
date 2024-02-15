import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { CantidadServiceService } from '../../../services/cantidad-service.service'
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Product {
  id: string;
  tipo: string;
  priceUSD: number;
  priceBCV: number;
  canTickets: number;
}

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

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tickets',
  standalone: true,
  providers: [NgModule],
  imports: [FormsModule, TableModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit{

  products!: Product[];
  servicios!: Servicio[];

  cols!: Column[];

  // Dialogo modal y Boton modal
  dialogVisible: boolean = false;
  buttomVisible: boolean = true;
  esValido: boolean = false;

  // Ocultar filas de la tabla del dialogo
  general: boolean = true;
  adulto: boolean = true;
  ninos: boolean = true;

  // Listas de la tabla del dialogo
  generalList!: any;
  adultoList!: any;
  ninosList!: any;
  servicioList!: any;

  // Tasa BCV
  tasa: number = 36.24;

  // Des/activar botones de suma y resta
  minusLimite: boolean = false; // Initialize as true by default
  plusLimite: boolean = true; // Initialize as true by default

  // Id de la pelicula
  peliID!: any;
  peli!: any;

  // datos de la sala
  salaID!: any;
  sala!: any;

  constructor(private router: Router, private cantidadService: CantidadServiceService, private route: ActivatedRoute, private http: HttpClient) {



    this.peliID = this.route.snapshot.paramMap.get('id');
    this.getPeli();
  }

  ngOnInit() {

    this.products = [
      {
        id: '1000',
        tipo: 'General',
        priceUSD: 4,
        priceBCV: 144.1,
        canTickets: 0
    },
    {
        id: '1001',
        tipo: 'Adulto Mayor',
        priceUSD: 2.5,
        priceBCV: 90.6,
        canTickets: 0
    },
    {
        id: '1002',
        tipo: 'Niño hasta 14*',
        priceUSD: 2.5,
        priceBCV: 90.6,
        canTickets: 0
    }
    ]

    this.servicios = [
      {
        cantidad: 0,
        priceTicket: 0,
        web: 0,
        servicio: 0,
        base: 0,
        iva: 0,
        totalUSD: 0,
        total: 0
      }
    ]

    this.cols = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Tipo de Entrada' },
        { field: 'category', header: 'Precio USD' },
        { field: 'quantity', header: 'Precio BCV' },
        { field: 'inventoryStatus', header: 'Cantidad' }
    ];
    this.generalList = this.products;
    this.adultoList = this.products;
    this.ninosList = this.products;
    this.servicioList = this.servicios;
    this.noseporque();
  }

  decreaseValue(product: Product) {
    if (product.canTickets > 0) {
      product.canTickets--;

      this.esValido = true;

      if(product.tipo === 'General' && product.canTickets >= 0)
      {
        this.generalList = product;
        this.servicioList.cantidad --;
        this.general = true;
        this.calculos(product, 'resta');
      } 
      else if (product.tipo === 'Adulto Mayor' && product.canTickets >= 0)
      {
        this.adultoList = product;
        this.servicioList.cantidad --;
        this.adulto = true;
        this.calculos(product, 'resta');
      } 
      else if (product.tipo === 'Niño hasta 14*' && product.canTickets >= 0) 
      {
        this.ninosList = product;
        this.servicioList.cantidad --;
        this.ninos = true;
        this.calculos(product, 'resta');
      }
      else 
      {
        this.general = false;
        this.adulto = false;
        this.ninos = false;
      }
      console.log(this.generalList);
      console.log(this.servicioList);
    } else {
      this.esValido = false;
    }
  }
  
  increaseValue(product: Product) {
    if (product.canTickets < 10) {
      product.canTickets++;
      this.esValido = true;
      
      if(this.servicioList.cantidad > 8)
      {
        this.plusLimite = false;
      } 
      else 
      {
        this.plusLimite = true;
        this.minusLimite = true;
        console.log('no alcanzado');

        if(product.tipo === 'General' && product.canTickets >= 0)
        {
          this.generalList = product;
          this.servicioList.cantidad ++;
          this.general = false;
          this.calculos(product, 'suma');
        }
        else if (product.tipo === 'Adulto Mayor' && product.canTickets >= 0)
        {
          this.adultoList = product;
          this.servicioList.cantidad ++;
          this.adulto = false;
          this.calculos(product, 'suma');
        }
        else if (product.tipo === 'Niño hasta 14*' && product.canTickets >= 0) 
        {
          this.ninosList = product;
          this.servicioList.cantidad ++;
          this.ninos = false;
          this.calculos(product, 'suma');
        }
        else 
        {
          this.general = true;
          this.adulto = true;
          this.ninos = true;
        }

      }

      
      console.log(this.generalList);
      console.log(this.servicioList);
    } 
  }

  calculos(data: Product, res: string){

    // La entrada de 1.7$ cuesta 2$ por pagina. 0.75$ la entrada + 0.75$ el servicio + 0.21$ servicio web + 16 % del iva
    // 4 / 2.66 = 1.5 + 1.5 = 3
    // 4 / 9.52 = 0.42 + 3 = 3.4276
    // 3.42 * 1.16 = 3.9672
    if(this.servicioList.cantidad >= 0 && data.tipo === 'General')
    {
      let base_imponible = ((((data.priceUSD / 2.66) * 2) + (data.priceUSD / 9.52)) * this.tasa).toFixed(2);
      let ser_web = ((data.priceUSD / 9.52) * this.tasa).toFixed(2);
      let servis = ((data.priceUSD / 2.66) * this.tasa).toFixed(2);
      let iva = (parseFloat(base_imponible) * 0.16).toFixed(2);

      if (res === 'suma')
      {
        this.servicioList.web += parseFloat(ser_web);
        this.servicioList.priceTicket += parseFloat(servis);
        this.servicioList.servicio += parseFloat(servis);
        this.servicioList.iva += parseFloat(iva);
        this.servicioList.base += parseFloat(base_imponible);
      } 
      else if (res === 'resta')
      {
        this.servicioList.web -= parseFloat(ser_web);
        this.servicioList.priceTicket -= parseFloat(servis);
        this.servicioList.servicio -= parseFloat(servis);
        this.servicioList.iva -= parseFloat(iva);
        this.servicioList.base -= parseFloat(base_imponible);
      }

      let dolar = ((this.servicioList.base / this.tasa) * 1.16).toFixed(2);
      let bolivares = (this.servicioList.base * 1.16).toFixed(2);
      
      this.servicioList.totalUSD = parseFloat(dolar);
      this.servicioList.total = parseFloat(bolivares);
    } 
    else if(this.servicioList.cantidad >= 0 && data.tipo === 'Adulto Mayor')
    {
      let base_imponible = ((((data.priceUSD / 2.66) * 2) + (data.priceUSD / 9.52)) * this.tasa).toFixed(2);
      let ser_web = ((data.priceUSD / 9.52) * this.tasa).toFixed(2);
      let servis = ((data.priceUSD / 2.66) * this.tasa).toFixed(2);
      let iva = (parseFloat(base_imponible) * 0.16).toFixed(2);

      if (res === 'suma')
      {
        this.servicioList.web += parseFloat(ser_web);
        this.servicioList.priceTicket += parseFloat(servis);
        this.servicioList.servicio += parseFloat(servis);
        this.servicioList.iva += parseFloat(iva);
        this.servicioList.base += parseFloat(base_imponible);
      } 
      else if (res === 'resta')
      {
        this.servicioList.web -= parseFloat(ser_web);
        this.servicioList.priceTicket -= parseFloat(servis);
        this.servicioList.servicio -= parseFloat(servis);
        this.servicioList.iva -= parseFloat(iva);
        this.servicioList.base -= parseFloat(base_imponible);
      }

      let dolar = ((this.servicioList.base / this.tasa) * 1.16).toFixed(2);
      let bolivares = (this.servicioList.base * 1.16).toFixed(2);
      
      this.servicioList.totalUSD = parseFloat(dolar);
      this.servicioList.total = parseFloat(bolivares);
    } 
    else if (this.servicioList.cantidad >= 0 && data.tipo === 'Niño hasta 14*')
    {
      let base_imponible = ((((data.priceUSD / 2.66) * 2) + (data.priceUSD / 9.52)) * this.tasa).toFixed(2);
      let ser_web = ((data.priceUSD / 9.52) * this.tasa).toFixed(2);
      let servis = ((data.priceUSD / 2.66) * this.tasa).toFixed(2);
      let iva = (parseFloat(base_imponible) * 0.16).toFixed(2);

      if (res === 'suma')
      {
        this.servicioList.web += parseFloat(ser_web);
        this.servicioList.priceTicket += parseFloat(servis);
        this.servicioList.servicio += parseFloat(servis);
        this.servicioList.iva += parseFloat(iva);
        this.servicioList.base += parseFloat(base_imponible);
      } 
      else if (res === 'resta')
      {
        this.servicioList.web -= parseFloat(ser_web);
        this.servicioList.priceTicket -= parseFloat(servis);
        this.servicioList.servicio -= parseFloat(servis);
        this.servicioList.iva -= parseFloat(iva);
        this.servicioList.base -= parseFloat(base_imponible);
      }

      let dolar = ((this.servicioList.base / this.tasa) * 1.16).toFixed(2);
      let bolivares = (this.servicioList.base * 1.16).toFixed(2);
      
      this.servicioList.totalUSD = parseFloat(dolar);
      this.servicioList.total = parseFloat(bolivares);
    }

  }

  noseporque(){
    this.servicioList.cantidad = 0;
    this.servicioList.priceTicket = 0;
    this.servicioList.web = 0;
    this.servicioList.servicio = 0;
    this.servicioList.base = 0;
    this.servicioList.iva = 0;
    this.servicioList.totalUSD = 0;
  }

  showDialog() {
    this.dialogVisible = true;
  }

  seleccion(){
    this.cantidadService.setServicios(this.servicioList);
    const id1 = this.peliID;
    const id2 = this.salaID;
    const url = `selec/seat/${id1}/${id2}`;
    this.router.navigateByUrl(url);
  }

  getPeli(){
    this.http.get(`http://127.0.0.1:8000/api/pelicula/${this.peliID}`).subscribe((data: any) => {
      this.peli = data;
      console.log(this.peli);
    }); 

    const salas$ = this.http.get(`http://127.0.0.1:8000/api/salas`);

    forkJoin([salas$]).subscribe(([salasData]) => {
      // Recorrer los datos de ambas peticiones
      const salasArray = Object.values(salasData);

      for (const sala of salasArray) {
          // Comparar un campo específico (por ejemplo, nombre)
          if (sala.pelicula === this.peli.nombre) {
            // Obtener el ID de la sala
            const idSala = sala.id;
            // ... usar el ID de la sala
            this.salaID = idSala;
            this.getSala();
            break;
          }
        
      }
    });
  }

  getSala(){
    this.http.get(`http://127.0.0.1:8000/api/sala/${this.salaID}`).subscribe((data: any) => {
      this.sala = data;
      console.log(this.sala);
    }); 
  }

  cancelar(){
    this.router.navigateByUrl('');
  }
}
