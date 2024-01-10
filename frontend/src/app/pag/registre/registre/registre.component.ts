import { FormsModule } from '@angular/forms';
import { Component, OnInit, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent implements OnInit{
  ClienteArray: any[] = [];

  // Variables
  nombre: string = "";
  usuario: string = "";
  email: string = "";
  contrasena: string = "";
  contrasenaConfir: string = "";
  tipo: string = "0";
  pais: string = "";
  estado: string = "";
  ciudad: string = "";

  // Validaciones
  validEmail = false;
  invalidEmail = false;
  regisEmail = false;
  userInvalid = false;
  contraConfir = false;
  validCamp = false;
  reload = false;

  currentClienteID = "";

  // Inputs Habilitados
  segundoInput: boolean;
  tercerInput: boolean;

  // Inputs de estados

  visiEstado = false;
  // Venezuela
  visiVenezuela = false;
  // Colombia
  visiColombia = false;
  // Chile
  visiChile = false;

  // Inputs de Ciudades

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.getAllCliente();
    const userData = localStorage.getItem('userData');

    if (userData) {
      console.log('El usuario está logueado');
      this.router.navigateByUrl('/');
    } else {
      console.log('El usuario no está logueado');
    }

  }

  ngOnInit(): void {
  }

  getAllCliente() {
    this.http.get("http://127.0.0.1:8000/api/admins").subscribe((resultData: any)=> {
        console.log(resultData);
        this.ClienteArray = resultData;
    });
  }

  register() {

    let bodyData = {
      "nombre": this.nombre,
      "usuario": this.usuario,
      "correo": this.email,
      "pais": this.pais,
      "estado": this.estado,
      "ciudad": this.ciudad,
      "contraseña": this.contrasena,
      "tipoUser": this.tipo,
    };

      this.http.post("http://127.0.0.1:8000/api/admin", bodyData).subscribe({
        next: (res: any) => {
          console.log(res)
          
          console.log("Registro Exitoso");
          alert("Usuario registrado con exito");
          this.getAllCliente();
          this.nombre = '';
          this.email = '';
          this.usuario = '';
          this.contrasena = '';
          this.contrasenaConfir = '';
          this.router.navigateByUrl('login');
        },
        error: (err: any) => {
          console.log(err.error.message);
          if (err.error.message == 'El nombre no puede estar vacio') {
            this.validCamp = true;
          } else if (err.error.message === 'El correo debe ser de Gmail') {
            this.validEmail = false;
            this.validCamp = false;
          } else if (err.error.message === 'El correo ya está registrado') {
            this.validEmail = false;
            this.invalidEmail = false;
            this.validCamp = false;
            this.regisEmail = true;
          }
           else if (err.error.message === 'El usuario ya esta registrado') {
            this.validEmail = false;
            this.invalidEmail = false;
            this.regisEmail = false;
            this.validCamp = false;
            this.userInvalid = true;
          }
        }
      });

  }



  accion(){
    this.reload = true;
    this.ejecutarAccion();
  }

  ejecutarAccion() {
    setTimeout(() => {
      // Coloca aquí la acción que deseas ejecutar después de 2 segundos
      this.reload = false;

      if(this.currentClienteID == '') {
        if (this.contrasena === this.contrasenaConfir){
          this.contraConfir = false;
          this.register();
        } else {
          this.contraConfir = true;
        } 
      }
    }, 4000); // 2000 milisegundos = 2 segundos
  }

  acceso(){
    this.router.navigateByUrl('login');
  }

  //    Funcion para cambiar el tipo de los inputs de contraseña y confirmar contraseña de password a text

  ngAfterViewInit() {
    const togglePassword = this.elementRef.nativeElement.querySelector('#togglePassword');
    const passwordInput = this.elementRef.nativeElement.querySelector('#inputPassword');
    const togglePassword2 = this.elementRef.nativeElement.querySelector('#togglePassword-2');
    const passwordInput2 = this.elementRef.nativeElement.querySelector('#inputPasswordConfir');

    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
    });
    

    togglePassword2.addEventListener('click', () => {
      const type = passwordInput2.type === 'password' ? 'text' : 'password';
      passwordInput2.type = type;
    });
  }

  //    Aqui seran las funciones para habilitar los inputs de Estados y Ciudad. Lo cual a su vez funcionan para que aparezcan los inputs correspondiente para 
  //    el autocompletado de cada pais

  habilitarSegundoInput(){
    if (this.pais === 'Venezuela') {
      this.visiEstado = true;
      this.visiVenezuela = true;
      this.visiChile = false;
      this.visiColombia = false;
    } else if (this.pais === 'Colombia'){
      this.visiEstado = true;
      this.visiVenezuela = false;
      this.visiChile = false;
      this.visiColombia = true;
    } else if (this.pais === 'Chile'){
      this.visiEstado = true;
      this.visiVenezuela = false;
      this.visiChile = true;
      this.visiColombia = false;
    } else {
      this.visiEstado = false; 
      this.segundoInput = false;
      this.visiVenezuela = false;
      this.visiChile = false;
      this.visiColombia = false;
    }
  }

  habilitarTercerInput(){
    if (this.estado) {
      this.tercerInput = true;
    } else {
      this.tercerInput = false;
    }
  }

}