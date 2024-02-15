import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'
import { ImageModule } from 'primeng/image';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-pelicula-create',
  standalone: true,
  imports: [CardModule, InputTextModule, FormsModule, ButtonModule, InputTextareaModule, CalendarModule, ColorPickerModule, CommonModule,
    ImageModule, ToastModule, ConfirmDialogModule],
  templateUrl: './pelicula-create.component.html',
  styleUrl: './pelicula-create.component.css',
  providers: [MessageService, ConfirmationService]
})
export class PeliculaCreateComponent implements OnInit {
  
  @ViewChild('checkboxRef') checkbox: ElementRef;
  @ViewChild('checkboxRef_2') checkbox_2: ElementRef;

  peliNombre: string | undefined;
  peliGenero: string | undefined;
  peliDescripcion: string | undefined;
  peliEstreno: string | undefined;
  peliImagen: string | undefined;
  peliColores: string | undefined;

  // Colores para el poster
  color_1: string | undefined;
  color_2: string | undefined;
  color_3: string | undefined;
  color_4: string | undefined;
  color_5: string | undefined;

  // Variables para el checkbox
  colorTitulo: string;
  colorAcordion: string;
 
  isCheckbox1Checked: boolean;
  checkbox1Value: string;
  
  isCheckbox2Checked: boolean;
  checkbox2Value: string;

  // Imagen

  imgRef: string | undefined;
  imgFile: File | null = null;
  selectedImageUrl: string | undefined;
  apiImagen: string;

  //  Boton de guardar
  isImageWithinDimensions: boolean = true; // Initialize as true by default

  constructor(private storage: Storage, private http: HttpClient, private messageService: MessageService, private router: Router,
    private confirmationService: ConfirmationService){
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

  ngOnInit() {
     // Inicializar los valores de los checkboxes
    this.isCheckbox1Checked = true;
    this.checkbox1Value = 'on';
    this.isCheckbox2Checked = true;
    this.checkbox2Value = 'on';

  }

  onCheckboxChange() {
    this.checkbox.nativeElement.addEventListener('blur', () => {
      this.isCheckbox1Checked = this.checkbox.nativeElement.checked;
      this.checkbox1Value = this.isCheckbox1Checked ? 'on' : 'off';
    });
  }
  
  onCheckboxChange_2() {
    this.checkbox_2.nativeElement.addEventListener('blur', () => {
      this.isCheckbox2Checked = this.checkbox_2.nativeElement.checked;
      this.checkbox2Value = this.isCheckbox2Checked ? 'on' : 'off';
    });
  }
  

  actualizar(){
    const file = this.imgFile;
    
    if (!file) {
      // Mostrar mensaje de error si no se ha seleccionado imagen
      return;
    }

      const checkAndUpload = async (fileName: string, index: number): Promise<void> => {
        const fileRef = ref(this.storage, `peliculas/${fileName}`);
        const fileExists = await getDownloadURL(fileRef)
          .then(() => true)
          .catch(() => false);
      
        if (fileExists) {
          // Si el archivo con el nombre actual ya existe, sumarle uno al nombre
          let [name, extension] = fileName.split('.');
          let newName = `${name}_${index}.${extension}`;
          return checkAndUpload(newName, index + 1); // Llamada recursiva con el nuevo nombre
        } else {
          // Subir el archivo con el nombre verificado
          return uploadBytes(fileRef, file)
            .then(async response => {
              console.log(response);
              const url = await getDownloadURL(fileRef);
              console.log(url);
              this.peliImagen = url;
              this.concatenarColors();
            })
            .catch(error => console.error(error));
        }
      };

      // Llamar a la función de verificación y subida con el nombre original del archivo
      checkAndUpload(file.name, 1);
      
  }

  subir(){

    if (!this.peliNombre || !this.peliImagen || !this.peliGenero || !this.peliEstreno || !this.peliDescripcion || !this.peliColores){
      this.camposVacios();
    } else {
      var inputData ={
        nombre: this.peliNombre,
        genero: this.peliGenero,
        imagen: this.peliImagen,
        descripcion: this.peliDescripcion,
        estreno: this.peliEstreno,
        colores: this.peliColores
      }
  
  
      console.log(inputData);
  
      this.http.post(`http://127.0.0.1:8000/api/pelicula`, inputData).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log('registrado con exito');
          this.exito();
          this.ejecutarAccion();
        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      });
    }
  }
  
  //    Visualizar imagen a subir

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
  
      if (allowedFormats.includes(file.type)) {
        // El formato del archivo es admitido

        const img = new Image();
        img.src = URL.createObjectURL(file);

        // Añade las dimensiones y verifica si son las permitidas
        img.onload = () => {
          if (img.width <= 120 && img.height <= 180) {
            this.imgFile = file; // Almacenar el archivo

            this.selectedImageUrl = URL.createObjectURL(file);

            this.isImageWithinDimensions = true; // Habilitar el botón de guardar
          } else {
            this.errorDimension();
            this.isImageWithinDimensions = false; // Deshabilitar el botón de guardar
            event.target.value = ''; // Limpiar el valor del input file para eliminar el nombre del archivo
            console.log('La imagen seleccionada no cumple con las dimensiones de 120x180');
          }
        };
      } else {
        // El formato del archivo no es admitido
        this.show();
        this.selectedImageUrl = ''; // Limpiar la URL de la imagen
        this.isImageWithinDimensions = false; // Deshabilitar el botón de guardar
        event.target.value = ''; // Limpiar el valor del input file para eliminar el nombre del archivo
      }
    }
  }

  //  Concatenar Colores
  concatenarColors() {
    this.colorTitulo = this.checkbox1Value === 'on' ? '#ffffff' : '#000000';
    this.colorAcordion = this.checkbox2Value === 'on' ? '#ffffff' : '#000000';

    if (!this.color_1 || !this.color_2 || !this.color_3 || !this.color_4 || !this.color_5) {
      console.log('input indefinido');
      this.inputColors();
    } else {
      let value = `${this.color_1} - ${this.color_2} - ${this.color_3} - ${this.color_4} - ${this.color_5} - ${this.colorTitulo} - ${this.colorAcordion}`;
      this.peliColores = value;
      console.log(value);
      this.subir();
    }
  }
  
  //  Validar que no puedas elegir la fecha de estreno un dia anterior al dia actual
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  //  Tiempo muerto
  ejecutarAccion() {
    setTimeout(() => {
      this.router.navigateByUrl(``);
      this.peliNombre = '';
      this.peliImagen = '';
      this.peliGenero = '';
      this.peliEstreno = '';
      this.peliDescripcion = '';
      this.peliColores = '';
      this.selectedImageUrl = '';
    }, 2000); // 2000 milisegundos = 2 segundos
  }

  //  mensajes de advertencia
  show() {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de formato de imagen', detail: 'Solo se permite subir archivos .png . jgp . jpeg' });
  }

  inputColors(){
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error en los inputs colors', detail: 'Los valores de los inputs estan indefinidos. Debes agregarle valores para continuar' });
  }

  errorDimension(){
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de imagen', detail: 'Solo se permiten imagenes igual o inferiores a 120x180.'});
  }

  camposVacios(){
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Campos vacios', detail: 'No puedes dejar ningun campo vacio.'});
  }

  exito(){
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Registro exitoso', detail: 'Se ha resgistrado la pelicula con exito.'});
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas seguro que deseas descartar los cambios?',
      header: '¿Descartar cambios?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.messageService.add({ severity: 'error', summary: 'Descartado', detail: 'El resgistro fue descartado.' });
          this.redireccionar();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Continuar', detail: 'Puede seguir registrando la pelicula.' });
      }
    });
  }

  redireccionar(){
    setTimeout(() => {
      this.router.navigateByUrl(``);
    }, 2000); // 2000 milisegundos = 2 segundos
  }
}
