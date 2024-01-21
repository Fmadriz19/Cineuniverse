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

@Component({
  selector: 'app-pelicula-edit',
  standalone: true,
  imports: [CardModule, InputTextModule, FormsModule, ButtonModule, InputTextareaModule, CalendarModule, ColorPickerModule, CommonModule,
            ImageModule],
  templateUrl: './pelicula-edit.component.html',
  styleUrl: './pelicula-edit.component.css'
})
export class PeliculaEditComponent implements OnInit {
  
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

  constructor(private storage: Storage, private http: HttpClient){

  }

  ngOnInit() {

  }


  onCheckboxChange() {
    this.isCheckbox1Checked = this.checkbox.nativeElement.checked;
    this.checkbox1Value = this.isCheckbox1Checked ? 'on' : 'off';
  }
  
  onCheckboxChange_2() {
    this.isCheckbox2Checked = this.checkbox_2.nativeElement.checked;
    this.checkbox2Value = this.isCheckbox2Checked ? 'on' : 'off';
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

    var inputData ={
      nombre: this.peliNombre,
      genero: this.peliGenero,
      imagen: this.peliImagen,
      descripcion: this.peliDescripcion,
      estreno: this.peliEstreno,
      colores: this.peliColores
    }


    console.log(inputData);

    /* this.http.post(`http://127.0.0.1:8000/api/pelicula`, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('registrado con exito');



        this.peliNombre = '';
        this.peliImagen = '';
        this.peliGenero = '';
        this.peliEstreno = '';
        this.peliDescripcion = '';
        this.peliColores = '';
        this.selectedImageUrl = '';
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    }); */

  /*  this.http.put(`http://127.0.0.1:8000/api/admin/${this.userID}`, inputData).subscribe({
      next: (res: any) => {
        console.log(res)
        alert('Usuario Actualizado')
        this.router.navigateByUrl('perfil');
      },
      error: (err: any) => {
        console.log(err.error.message);
        if (err.error.message == 'El correo no puede estar vacio') {
          this.validEmail = true;
        } else if (err.error.message === 'El correo debe ser de Gmail') {
          this.validEmail = false;
          this.invalidEmail = true;
        
        } else if (err.error.message === 'El correo ya está registrado') {
          this.validEmail = false;
          this.invalidEmail = false;
          this.regisEmail = true;
        }
         else if (err.error.message === 'El usuario ya esta registrado') {
          this.validEmail = false;
          this.invalidEmail = false;
          this.regisEmail = false;
          this.userInvalid = true;
        }
      }
    }); */
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
            // Image exceeds the maximum dimensions
            this.isImageWithinDimensions = false; // Deshabilitar el botón de guardar
            this.imgFile = null; // Reiniciar el archivo seleccionado
            event.target.value = ''; // Limpiar el valor del input file para eliminar el nombre del archivo
            console.log('La imagen seleccionada no cumple con las dimensiones de 120x180');
          }
        };
      } else {
        // El formato del archivo no es admitido
        console.log('El formato del archivo no es compatible. Por favor, selecciona un archivo .png, .jpeg o .jpg');
        this.imgFile = null; // Reiniciar el archivo seleccionado
        this.selectedImageUrl = ''; // Limpiar la URL de la imagen
        this.isImageWithinDimensions = false; // Deshabilitar el botón de guardar
        event.target.value = ''; // Limpiar el valor del input file para eliminar el nombre del archivo
      }
    }
  }
  
  

  //  Concatenar Colores
  concatenarColors() {
    this.colorTitulo = this.checkbox1Value === 'on' ? '#fffff' : '#000000';
    this.colorAcordion = this.checkbox2Value === 'on' ? '#fffff' : '#000000';

    /* if (!this.color_1 || !this.color_2 || !this.color_3 || !this.color_4 || !this.color_5) {
      console.log('input indefinido');
    } else { */
      let value = `${this.color_1} - ${this.color_2} - ${this.color_3} - ${this.color_4} - ${this.color_5} - ${this.colorTitulo} - ${this.colorAcordion}`;
      this.peliColores = value;
      console.log(value);
      this.subir();
    
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
}
