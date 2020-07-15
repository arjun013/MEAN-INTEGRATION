import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from './service/product.service';
import { AuthService } from './service/auth.service';
import { TokenInterceptorService } from './service/token-interceptor.service';

import { AuthGuard } from './auth.guard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent,
    ProductListComponent,
    LoginComponent,
    SignupComponent,
    AddProductComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule 
  ],
  providers: [ProductService,AuthService,AuthGuard,
      {
        provide:HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi:true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
