import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalaEntidad } from '../dto/sala-entidad';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import * as jspdf from 'jspdf';
import { autoTable } from 'jspdf-autotable';

interface Product {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  genero: string;
  estreno: string;
  colores: string;
}

interface Column {
  field: string;
  header: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-salas-list',
  standalone: true,
  imports: [CommonModule, TableModule , ButtonModule, InputTextModule, FormsModule, TooltipModule, TabViewModule, TableModule],
  templateUrl: './salas-list.component.html',
  styleUrl: './salas-list.component.css'
})
export class SalasListComponent implements OnInit{

  // Salas
  SalasArray: any[] = [];

  //  Peliculas
  products: Product[] = [];
  listado: Product[] = [];
  Encontrar = '';
  cols!: Column[];
  exportColumns!: ExportColumn[];

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

    this.getAllSala();
    this.getAllPeli();
  }

  ngOnInit(): void {
    // PDF
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'genero', header: 'Genero' },
      { field: 'estreno', header: 'Fecha de Estreno' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'imagen', header: 'Imagen del poster' }
  ];

  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  
  }

  //  Salas
  getAllSala() {
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
      this.getAllSala();
  });
  }

  EditarSala(sal: SalaEntidad): void{
    this.router.navigateByUrl(`/salas/edit/${sal.id}`);
  }


  // Peliculas

  getAllPeli(){
    this.http.get("http://127.0.0.1:8000/api/peliculas").subscribe((resultData: any)=> {
        //console.log(resultData);
        this.products = resultData;
        this.listado = resultData;
        console.log(this.products);
        console.log(this.listado);
    });
  }

  Busqueda(event: any) {
    const busqueda = event.target.value.trim().toLowerCase(); // Utiliza trim() para eliminar espacios en blanco al inicio y al final del texto
    if (busqueda === '') {
      this.products = this.listado; // Restablece this.products a todos los productos originales
    } else {
      this.products = this.products.filter(product => {
        const nombre = product.nombre.toLowerCase();
        const categoria = product.genero.toLowerCase();
        return nombre.includes(busqueda) || categoria.includes(busqueda);
      });
    }
  }
  

  imprimir(){
    window.print();
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.products);
            doc.save('products.pdf');
        });
    });
  }

  newPeli(){
    this.router.navigateByUrl('create/pelicula');
  }
}
