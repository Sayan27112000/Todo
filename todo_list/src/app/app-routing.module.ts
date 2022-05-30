import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListdataComponent } from './listdata/listdata.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path : '' , redirectTo : 'login' , pathMatch : 'full' },
  { path : 'login' , component : LoginComponent },
  { path : 'register' , component : RegisterComponent },
  { path : 'listdata' , component : ListdataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
