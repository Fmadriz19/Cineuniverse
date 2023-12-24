import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pag/home/home/home.component';
import { EditComponent } from './pag/edit/edit/edit.component';
import { LoginComponent } from './pag/login/login/login.component';
import { NavbarComponent } from './pag/navbar/navbar/navbar.component';
import { RegistreComponent } from './pag/registre/registre/registre.component';
import { AdminServiceService } from './services/admin-service.service';
import { NgModule } from '@angular/core';
import { SalasListComponent } from './pag/salas/salas-list/salas-list.component';
import { SalasCreateComponent } from './pag/salas/salas-create/salas-create.component';
import { SalasEditComponent } from './pag/salas/salas-edit/salas-edit.component';
import { PerfilComponent } from './pag/perfil/perfil.component';
import { SalaEntidad } from './pag/salas/dto/sala-entidad';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ NgModule, AdminServiceService, SalaEntidad, DatePipe],
  imports: [CommonModule, RouterOutlet, RegistreComponent, LoginComponent, EditComponent, HomeComponent, HttpClientModule, NavbarComponent,
    SalasListComponent, SalasCreateComponent, SalasEditComponent, PerfilComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
