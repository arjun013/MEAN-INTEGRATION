import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products =<any>[];
  showImage = true;
  imageToggle(){
    this.showImage = !this.showImage;
  }
  constructor(
        private _productService:ProductService,
        public _authService:AuthService
        ) { }
    //ask permission for deletion
  deletePermission = false;
  deletableId :any;
  getDeletePermission(id){
    this.deletableId = id;
    this.deletePermission = true;
  }
  //delete selected product
  deleteProduct(id){
    this.deletePermission = false;
    this._productService.deleteTheProduct(id)
    .subscribe(
      res => this.getTheProducts() ,//get the changed products list after deletion from db
      err => console.log(err)
    )
  }
  //get all product details from db
  getTheProducts(){
      this._productService.getProducts()
      .subscribe(
      res => this.products=res,
      err => console.log(err)
    )
  }

  ngOnInit(){
  	this.getTheProducts();
  }

}
