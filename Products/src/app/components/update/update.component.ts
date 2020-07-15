import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
  	private _productService:ProductService,
  	private _router: Router,
    private _authService : AuthService
  ) { }
    productItem: any ={};

  productId1 = this._router.url.split('/')
  productId=this.productId1[this.productId1.length - 1];

  ngOnInit(): void {
  //update only if logged in
   
          this._productService.getSingleProduct(this.productId)
              .subscribe(
          res => this.productItem = res,
          err => {
            if(err instanceof HttpErrorResponse){
              if(err.status === 401||err.status === 500){
                localStorage.removeItem('token');
                this._router.navigate(['/login'])
          }
        }
        })
   
  }
  updateProduct(){
  	this._productService.updateTheProduct(this.productItem,this.productId)
    .subscribe( (res) =>{
        this._router.navigate(['']);
        alert("updation success");
    } )
  }

}
