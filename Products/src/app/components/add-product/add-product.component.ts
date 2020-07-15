import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ProductModel } from './productModel'; 
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
  	private _productService:ProductService,
  	private _router: Router,
    private _authService:AuthService
  ) { }
  productItem = new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
    this._productService.addProductLoad()
    .subscribe(
      res => console.log(' '),
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401||err.status === 500){
            localStorage.removeItem('token');
            this._router.navigate(['/login'])
          }
        }
        })
  }
  addProduct(){
  	this._productService.newProduct(this.productItem).subscribe( (data) => {
  		this._router.navigate(['']);
  	})
  }

}
