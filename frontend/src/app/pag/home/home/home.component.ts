import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import Tooltip from 'bootstrap/js/dist/tooltip';
import { HttpClient } from '@angular/common/http';
import { UndoIcon } from 'primeng/icons/undo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  prev: Element | null;
  next: Element | null;
  box: Element | null;
  degrees: number = 0;

  showModal = false;

  //  Variables del modal
  titulo: string = '';
  descripcion: string = '';
  genero: string = '';
  estreno: string = '';
  imagen: string | undefined;

  inputColor_1: string | undefined;
  inputColor_2: string | undefined;
  inputColor_3: string | undefined;
  inputColor_4: string | undefined;
  inputColor_5: string | undefined;

  // Variables para cada poster y modal
  peliPoster_1!: any;
  peliPoster_2!: any;
  peliPoster_3!: any;
  peliPoster_4!: any;
  peliPoster_5!: any;
  peliPoster_6!: any;
  peliPoster_7!: any;
  peliPoster_8!: any;
  peliPoster_9!: any;
  peliPoster_10!: any;
  peliPoster_11!: any;
  peliPoster_12!: any;
  peliPoster_13!: any;
  peliPoster_14!: any;
  peliPoster_15!: any;

  peliImagen_1: string | undefined;
  peliImagen_2: string | undefined;
  peliImagen_3: string | undefined;
  peliImagen_4: string | undefined;
  peliImagen_5: string | undefined;
  peliImagen_6: string | undefined;
  peliImagen_7: string | undefined;
  peliImagen_8: string | undefined;
  peliImagen_9: string | undefined;
  peliImagen_10: string | undefined;
  peliImagen_11: string | undefined;
  peliImagen_12: string | undefined;
  peliImagen_13: string | undefined;
  peliImagen_14: string | undefined;
  peliImagen_15: string | undefined;

  @ViewChild('box') boxElement: ElementRef;


  constructor(private router: Router, private http: HttpClient) {
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');
    this.box = document.querySelector('.box');
    this.boxElement = new ElementRef('.box');

  }

  ngAfterViewInit() {
    // Inicializar los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')) as Element[];
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getPeli();
  }

  //  Verificacion de si es admin o cliente
  getUser(){

    let userData = localStorage.getItem('userData');

    // Verificar si se encontró un valor en el localStorage
    if (userData) {
      // Convertir el valor de cadena a objeto JSON
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      let tipoUser = parsedUserData.tipoUser;
      console.log(tipoUser);

      if (tipoUser == 1) {
        this.showModal = false; // Retorna falso sintipoUser es igual a 1
      } else if (tipoUser == 0) {
        this.showModal = true; // Retorna verdadero si tipoUser es igual a 0
      }
    } else {
      // No se encontró ningún valor en el localStorage
      this.showModal= true;
      console.log('No se encontró ningún dato en el localStorage');
    }

  }

  //  Extrayendo Datos de todas las peliculas
  getPeli(){
    this.http.get(`http://127.0.0.1:8000/api/peliculas`).subscribe({
      next: (res: any) =>{
        console.log(res);

        // Guardar informacion en cada poster
        this.peliPoster_1 = res[0];
        this.peliPoster_2 = res[1];
        this.peliPoster_3 = res[2];
        this.peliPoster_4 = res[3];
        this.peliPoster_5 = res[4];
        this.peliPoster_6 = res[5];
        this.peliPoster_7 = res[6];
        this.peliPoster_8 = res[7];
        this.peliPoster_9 = res[8];
        this.peliPoster_10 = res[9];
        this.peliPoster_11 = res[10];
        this.peliPoster_12 = res[11];
        this.peliPoster_13 = res[12];
        this.peliPoster_14 = res[13];
        this.peliPoster_15 = res[14];

        // Guardar imagen en cada lado correspondiente
        this.peliImagen_1 = res[0].imagen;
        this.peliImagen_2 = res[1].imagen;
        this.peliImagen_3 = res[2].imagen;
        this.peliImagen_4 = res[3].imagen;

        this.comprobar();
      }, error: (err: any) => {
        console.log(err.error.message);
      }

    });
  }

  comprobar(){
    console.log(this.peliPoster_1);
    console.log(this.peliPoster_2);
    console.log(this.peliPoster_3);
    console.log(this.peliPoster_4);
  }

  nextFun(){
    if (this.boxElement){
      console.log('se cumple');
      this.degrees -= 24;
      this.boxElement.nativeElement.style.transform = `perspective(1000px) rotateY(${this.degrees}deg)`;
    }
  }

  prevFun(){
    if (this.boxElement){
      console.log('se cumple');
      this.degrees += 24;
      this.boxElement.nativeElement.style.transform = `perspective(1000px) rotateY(${this.degrees}deg)`;
    }
  }

  editPeli(){  
    // Redirigir a la nueva ruta
    this.router.navigateByUrl('edit/pelicula');
  }

 
  //  Verificar que contenido tendra el modal
  poster_4(){
    this.titulo = this.peliPoster_4.nombre;
    this.descripcion = this.peliPoster_4.descripcion;
    this.genero = this.peliPoster_4.genero;
    this.estreno = this.peliPoster_4.estreno;
    this.imagen = this.peliPoster_4.imagen;

    const colors = this.peliPoster_4.colores;

    // Dividir el string en un array utilizando el separador "-"
    const coloresArray = colors.split(' - ');

    // Asignar cada valor a una variable diferente
    const color1 = coloresArray[0];
    const color2 = coloresArray[1];
    const color3 = coloresArray[2];
    const color4 = coloresArray[3];
    const color5 = coloresArray[4];
    const color6 = coloresArray[5];
    const color7 = coloresArray[6];

    console.log(color3);

    //  Define el color de fondo del poster
    const backgroundGradient = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}), linear-gradient(to bottom, ${color4}, ${color5})`;
    const modalContent = document.querySelector('#Modal .modal-content') as HTMLElement;
    ;

    if(modalContent){
      modalContent.style.background = backgroundGradient;
    }

    //  Define el color de fondo del Acordion

    //  Define los colores de la sombra
    const box_shadows = `5px 5px 5px ${color4}, 10px 10px 10px ${color1}`;
    const sombra = document.querySelector('#Modal .sombra') as HTMLElement;
  

    if(sombra){
      sombra.style.boxShadow = box_shadows;
    }

    //  Define los colores de los inputs de la paleta de colores

    const colorInputs = document.querySelectorAll('.accordion-body input[type="color"]');

    // Definir los valores para cada input
    colorInputs[0].setAttribute('value', color1);
    colorInputs[1].setAttribute('value', color2);
    colorInputs[2].setAttribute('value', color3);
    colorInputs[3].setAttribute('value', color4);
    colorInputs[4].setAttribute('value', color5);

    // Define el color de las letras del titulo

    const letras = `${color6}`;
    const titulo = document.querySelector('#Modal .modal-title') as HTMLElement;
  
    if(titulo){
      titulo.style.color = letras;
    }

    // Define el color de las letras del acordion

    const letrasAcor = `${color7}`;
    const font = document.querySelector('#Modal .acordion-item') as HTMLElement;
    const font2 = document.querySelector('#Modal .acordion-item2') as HTMLElement;
    const font3 = document.querySelector('#Modal .acordion-item3') as HTMLElement;
    const font4 = document.querySelector('#Modal .acordion-item4') as HTMLElement;
    const buttom_font = document.querySelector('#Modal .buttom-acordion') as HTMLElement;
    const buttom_font2 = document.querySelector('#Modal .buttom-acordion2') as HTMLElement;
    const buttom_font3 = document.querySelector('#Modal .buttom-acordion3') as HTMLElement;
    const buttom_font4 = document.querySelector('#Modal .buttom-acordion4') as HTMLElement;
  
    if(font){
      font.style.color = letrasAcor;
      font2.style.color = letrasAcor;
      font3.style.color = letrasAcor;
      font4.style.color = letrasAcor;
      buttom_font.style.color = letrasAcor;
      buttom_font2.style.color = letrasAcor;
      buttom_font3.style.color = letrasAcor;
      buttom_font4.style.color = letrasAcor;
    }
  }

  poster_3(){
    this.titulo = this.peliPoster_3.nombre;
    this.descripcion = this.peliPoster_3.descripcion;
    this.genero = this.peliPoster_3.genero;
    this.estreno = this.peliPoster_3.estreno;
    this.imagen = this.peliPoster_3.imagen;

    const colors = this.peliPoster_3.colores;

    // Dividir el string en un array utilizando el separador "-"
    const coloresArray = colors.split(' - ');

    // Asignar cada valor a una variable diferente
    const color1 = coloresArray[0];
    const color2 = coloresArray[1];
    const color3 = coloresArray[2];
    const color4 = coloresArray[3];
    const color5 = coloresArray[4];
    const color6 = coloresArray[5];
    const color7 = coloresArray[6];

    console.log(color3);

    //  Define el color de fondo del poster
    const backgroundGradient = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}), linear-gradient(to bottom, ${color4}, ${color5})`;
    const modalContent = document.querySelector('#Modal .modal-content') as HTMLElement;
    ;

    if(modalContent){
      modalContent.style.background = backgroundGradient;
    }

    //  Define el color de fondo del Acordion

    //  Define los colores de la sombra
    const box_shadows = `5px 5px 5px ${color4}, 10px 10px 10px ${color1}`;
    const sombra = document.querySelector('#Modal .sombra') as HTMLElement;
  

    if(sombra){
      sombra.style.boxShadow = box_shadows;
    }

    //  Define los colores de los inputs de la paleta de colores

    const colorInputs = document.querySelectorAll('.accordion-body input[type="color"]');

    // Definir los valores para cada input
    colorInputs[0].setAttribute('value', color1);
    colorInputs[1].setAttribute('value', color2);
    colorInputs[2].setAttribute('value', color3);
    colorInputs[3].setAttribute('value', color4);
    colorInputs[4].setAttribute('value', color5);

    // Define el color de las letras del titulo

    const letras = `${color6}`;
    const titulo = document.querySelector('#Modal .modal-title') as HTMLElement;
  
    if(titulo){
      titulo.style.color = letras;
    }

    // Define el color de las letras del acordion

    const letrasAcor = `${color7}`;
    const font = document.querySelector('#Modal .acordion-item') as HTMLElement;
    const font2 = document.querySelector('#Modal .acordion-item2') as HTMLElement;
    const font3 = document.querySelector('#Modal .acordion-item3') as HTMLElement;
    const font4 = document.querySelector('#Modal .acordion-item4') as HTMLElement;
    const buttom_font = document.querySelector('#Modal .buttom-acordion') as HTMLElement;
    const buttom_font2 = document.querySelector('#Modal .buttom-acordion2') as HTMLElement;
    const buttom_font3 = document.querySelector('#Modal .buttom-acordion3') as HTMLElement;
    const buttom_font4 = document.querySelector('#Modal .buttom-acordion4') as HTMLElement;
  
    if(font){
      font.style.color = letrasAcor;
      font2.style.color = letrasAcor;
      font3.style.color = letrasAcor;
      font4.style.color = letrasAcor;
      buttom_font.style.color = letrasAcor;
      buttom_font2.style.color = letrasAcor;
      buttom_font3.style.color = letrasAcor;
      buttom_font4.style.color = letrasAcor;
    }
  }

  poster_2(){
    this.titulo = this.peliPoster_2.nombre;
    this.descripcion = this.peliPoster_2.descripcion;
    this.genero = this.peliPoster_2.genero;
    this.estreno = this.peliPoster_2.estreno;
    this.imagen = this.peliPoster_2.imagen;

    const colors = this.peliPoster_2.colores;

    // Dividir el string en un array utilizando el separador "-"
    const coloresArray = colors.split(' - ');

    // Asignar cada valor a una variable diferente
    const color1 = coloresArray[0];
    const color2 = coloresArray[1];
    const color3 = coloresArray[2];
    const color4 = coloresArray[3];
    const color5 = coloresArray[4];
    const color6 = coloresArray[5];
    const color7 = coloresArray[6];

    console.log(color3);

    //  Define el color de fondo del poster
    const backgroundGradient = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}), linear-gradient(to bottom, ${color4}, ${color5})`;
    const modalContent = document.querySelector('#Modal .modal-content') as HTMLElement;
    ;

    if(modalContent){
      modalContent.style.background = backgroundGradient;
    }

    //  Define el color de fondo del Acordion

    //  Define los colores de la sombra
    const box_shadows = `5px 5px 5px ${color4}, 10px 10px 10px ${color1}`;
    const sombra = document.querySelector('#Modal .sombra') as HTMLElement;
  

    if(sombra){
      sombra.style.boxShadow = box_shadows;
    }

    //  Define los colores de los inputs de la paleta de colores

    const colorInputs = document.querySelectorAll('.accordion-body input[type="color"]');

    // Definir los valores para cada input
    colorInputs[0].setAttribute('value', color1);
    colorInputs[1].setAttribute('value', color2);
    colorInputs[2].setAttribute('value', color3);
    colorInputs[3].setAttribute('value', color4);
    colorInputs[4].setAttribute('value', color5);

    // Define el color de las letras del titulo

    const letras = `${color6}`;
    const titulo = document.querySelector('#Modal .modal-title') as HTMLElement;
  
    if(titulo){
      titulo.style.color = letras;
    }

    // Define el color de las letras del acordion

    const letrasAcor = `${color7}`;
    const font = document.querySelector('#Modal .acordion-item') as HTMLElement;
    const font2 = document.querySelector('#Modal .acordion-item2') as HTMLElement;
    const font3 = document.querySelector('#Modal .acordion-item3') as HTMLElement;
    const font4 = document.querySelector('#Modal .acordion-item4') as HTMLElement;
    const buttom_font = document.querySelector('#Modal .buttom-acordion') as HTMLElement;
    const buttom_font2 = document.querySelector('#Modal .buttom-acordion2') as HTMLElement;
    const buttom_font3 = document.querySelector('#Modal .buttom-acordion3') as HTMLElement;
    const buttom_font4 = document.querySelector('#Modal .buttom-acordion4') as HTMLElement;
  
    if(font){
      font.style.color = letrasAcor;
      font2.style.color = letrasAcor;
      font3.style.color = letrasAcor;
      font4.style.color = letrasAcor;
      buttom_font.style.color = letrasAcor;
      buttom_font2.style.color = letrasAcor;
      buttom_font3.style.color = letrasAcor;
      buttom_font4.style.color = letrasAcor;
    }
  }

  poster_1(){

    this.titulo = this.peliPoster_1.nombre;
    this.descripcion = this.peliPoster_1.descripcion;
    this.genero = this.peliPoster_1.genero;
    this.estreno = this.peliPoster_1.estreno;
    this.imagen = this.peliPoster_1.imagen;

    const colors = this.peliPoster_1.colores;

    // Dividir el string en un array utilizando el separador "-"
    const coloresArray = colors.split(' - ');

    // Asignar cada valor a una variable diferente
    const color1 = coloresArray[0];
    const color2 = coloresArray[1];
    const color3 = coloresArray[2];
    const color4 = coloresArray[3];
    const color5 = coloresArray[4];
    const color6 = coloresArray[5];
    const color7 = coloresArray[6];

    console.log(color3);

    //  Define el color de fondo del poster
    const backgroundGradient = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}), linear-gradient(to bottom, ${color4}, ${color5})`;
    const modalContent = document.querySelector('#Modal .modal-content') as HTMLElement;
    ;

    if(modalContent){
      modalContent.style.background = backgroundGradient;
    }

    //  Define el color de fondo del Acordion

    //  Define los colores de la sombra
    const box_shadows = `5px 5px 5px ${color4}, 10px 10px 10px ${color1}`;
    const sombra = document.querySelector('#Modal .sombra') as HTMLElement;
  

    if(sombra){
      sombra.style.boxShadow = box_shadows;
    }

    //  Define los colores de los inputs de la paleta de colores

    const colorInputs = document.querySelectorAll('.accordion-body input[type="color"]');

    // Definir los valores para cada input
    colorInputs[0].setAttribute('value', color1);
    colorInputs[1].setAttribute('value', color2);
    colorInputs[2].setAttribute('value', color3);
    colorInputs[3].setAttribute('value', color4);
    colorInputs[4].setAttribute('value', color5);

    // Define el color de las letras del titulo

    const letras = `${color6}`;
    const titulo = document.querySelector('#Modal .modal-title') as HTMLElement;
  
    if(titulo){
      titulo.style.color = letras;
    }

    // Define el color de las letras del acordion

    const letrasAcor = `${color7}`;
    const font = document.querySelector('#Modal .acordion-item') as HTMLElement;
    const font2 = document.querySelector('#Modal .acordion-item2') as HTMLElement;
    const font3 = document.querySelector('#Modal .acordion-item3') as HTMLElement;
    const font4 = document.querySelector('#Modal .acordion-item4') as HTMLElement;
    const buttom_font = document.querySelector('#Modal .buttom-acordion') as HTMLElement;
    const buttom_font2 = document.querySelector('#Modal .buttom-acordion2') as HTMLElement;
    const buttom_font3 = document.querySelector('#Modal .buttom-acordion3') as HTMLElement;
    const buttom_font4 = document.querySelector('#Modal .buttom-acordion4') as HTMLElement;
  
    if(font){
      font.style.color = letrasAcor;
      font2.style.color = letrasAcor;
      font3.style.color = letrasAcor;
      font4.style.color = letrasAcor;
      buttom_font.style.color = letrasAcor;
      buttom_font2.style.color = letrasAcor;
      buttom_font3.style.color = letrasAcor;
      buttom_font4.style.color = letrasAcor;
    }
  }
}
