import { Routes } from '@angular/router';
import { HomeComponent } from './pag/home/home/home.component';
import { EditComponent } from './pag/edit/edit/edit.component';
import { LoginComponent } from './pag/login/login/login.component';
import { RegistreComponent } from './pag/registre/registre/registre.component';
import { SalasListComponent } from './pag/salas/salas-list/salas-list.component';
import { SalasCreateComponent } from './pag/salas/salas-create/salas-create.component';
import { SalasEditComponent } from './pag/salas/salas-edit/salas-edit.component';
import { PerfilComponent } from './pag/perfil/perfil.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'registre', component: RegistreComponent, title: 'Registrar Usuario' },
    { path: 'clientes/edit', component: EditComponent, title: 'Editar Perfil' },
    { path: 'login', component: LoginComponent, title: 'Iniciar Sesion' },
    { path: 'salas', component: SalasListComponent, title: 'Listado de Salas' },
    { path: 'salas/create', component: SalasCreateComponent, title: 'Crear Nueva Sala' },
    { path: 'salas/edit', component: SalasEditComponent, title: 'Edicion de Salas' },
    { path: 'perfil', component: PerfilComponent, title: 'Perfil' }
  ];
