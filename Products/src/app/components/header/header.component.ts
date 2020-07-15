import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
  constructor(public _authService: AuthService) { }
  //for responsiveness
  navChangeValid=true;
  navChange(){
	  this.navChangeValid=!this.navChangeValid;
  }
  ngOnInit(): void {
   
  }
  logoutUser(){
    localStorage.removeItem('token');
  }

}
