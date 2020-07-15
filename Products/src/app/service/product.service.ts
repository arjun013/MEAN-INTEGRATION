import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _poductsUrl 
  	=	"http://localhost:8000/insert"
	private _addProductUrl 
		="http://localhost:8000/insert/add"
  private _editProductUrl 
    ="http://localhost:8000/insert/edit"
  private _deleteProductUrl 
    ="http://localhost:8000/insert/delete"
  private _updateProductUrl 
    ="http://localhost:8000/insert/update"

  constructor(private http:HttpClient) { }
  //get all product for display
  getProducts(){
  	return this.http.get(this._poductsUrl)
  }
  
  addProductLoad(){
    return this.http.get(this._poductsUrl+'/loadAdd')
  }
  //add product to db
  newProduct(item){
  	return this.http.post(this._addProductUrl,{"product":item})
  }
  //update a selected product
  updateTheProduct(product,id){
    return this.http.post(this._updateProductUrl,{"product":product,"selectId":id})
  }
  //delete  some product
  deleteTheProduct(id){     
     return this.http.get(this._deleteProductUrl+'/'+id)
       }
  //retrieve product to update
  getSingleProduct(id){
      return this.http.get(this._editProductUrl+'/'+id)
  }
}
