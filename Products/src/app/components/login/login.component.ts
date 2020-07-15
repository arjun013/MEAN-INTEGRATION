import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	logUser = {	username:'' , password : ''}

  constructor(
  	private _authService:AuthService,
  	private _router: Router
  ) { }

  ngOnInit(): void {
    if(this._authService.loggedIn()) this._router.navigate([''])
  }
  loginUser(){
  		this._authService.loginUser(this.logUser)
  		.subscribe( res=> {
  						localStorage.setItem('token',res["token"]);
              this._router.navigate(['add'])  
  					},
  					err =>  alert(err.error)
            )
  }

}
