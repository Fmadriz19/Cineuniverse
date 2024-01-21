import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  userID!: any;
  tipoUser!: any;
  admin!: any;
  email: string='';
  password: string='';
  validEmail = false;
  invalidEmail = false;
  regisEmail = false;
  userInvalid = false;
  codigoPais = 0;

  imgRef: string | undefined;
  imgFile: File | null = null;
  selectedImageUrl: string | undefined;
  apiImagen: string;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;


  constructor(private http: HttpClient, private router: Router, private storage: Storage) { 
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
    } else {
      console.log('El usuario no está logueado');
      this.router.navigateByUrl('');
    }

  }


  ngOnInit() {
    this.getUser();
  }

  getUser(){

    let userData = localStorage.getItem('userData');

    // Verificar si se encontró un valor en el localStorage
    if (userData) {
      // Convertir el valor de cadena a objeto JSON
      let parsedUserData = JSON.parse(userData);
      // Utilizar el valor obtenido del localStorage
      this.userID = parsedUserData.id;
      this.tipoUser = parsedUserData.tipoUser;

      this.getUpdate();
    } else {
      // No se encontró ningún valor en el localStorage
      console.log('No se encontró ningún dato en el localStorage');
    }

  }

  //    Extrae Datos del Usuario

  getUpdate(){
    this.http.get(`http://127.0.0.1:8000/api/admin/${this.userID}`).subscribe((data: any) => {
      this.admin = data;
      console.log(this.admin);
      this.numPais();
    });
    
  }

  //    Funciones para actualizar

  actualizar(){
    const file = this.imgFile;
    
    if (!file) {
      // Mostrar mensaje de error si no se ha seleccionado imagen
      return;
    }

      const checkAndUpload = async (fileName: string, index: number): Promise<void> => {
        const fileRef = ref(this.storage, `usuario/${fileName}`);
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
              this.apiImagen = url;
              this.subir();
            })
            .catch(error => console.error(error));
        }
      };

      // Llamar a la función de verificación y subida con el nombre original del archivo
      checkAndUpload(file.name, 1);
      
  }

  subir(){
    let cell = this.codigoPais.toString() + this.admin.telefono.toString();

    var inputData ={
      nombre: this.admin.nombre,
      apellido: this.admin.apellido,
      cedula: this.admin.cedula,
      imagen: this.apiImagen,
      correo: this.admin.correo,
      direccion: this.admin.direccion,
      pais: this.admin.pais,
      estado: this.admin.estado,
      ciudad: this.admin.ciudad,
      telefono: cell,
      usuario: this.admin.usuario,
    }


    console.log(inputData);

    this.http.put(`http://127.0.0.1:8000/api/admin/${this.userID}`, inputData).subscribe({
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
    });
  }
  
  //  Funcion para definir el numero telefonico del pais
  numPais(){
    let valor = this.admin.pais;
    const spanElement = document.querySelector('.input-group-text');

    if (spanElement) {
      if(valor === 'Venezuela'){
        spanElement.textContent = '+58';
        this.codigoPais = 58;
      } else if(valor === 'Colombia'){
        spanElement.textContent = '+57';
      } else if(valor === 'Chile'){
        spanElement.textContent = '+56';
      }
    }
  }

  //    Visualizar imagen a subir

  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgFile = event.target.files[0]; // Storage Firebase

      // Obtiene el archivo de imagen del input
      this.selectedImageUrl = URL.createObjectURL(file);

    }
  } 
}
