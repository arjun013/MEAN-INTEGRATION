import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateComponent } from './components/update/update.component';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path :'',component:ProductListComponent},
  {path:'add',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'edit',component:UpdateComponent,
  	children:[
             {
               path:':type',
               component:UpdateComponent
             }
           ],canActivate:[AuthGuard]}
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
