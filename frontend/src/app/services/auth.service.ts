import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import {BehaviorSubject} from 'rxjs';
import { Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api:ApiServiceService,
              private router:Router
    ) { }

  // Login(data:any){
  //   this.api.login(data).subscribe({
  //     next:res => {
  //       if(res.success){
  //         localStorage.setItem('token',res.token)
  //         return res.message;
  //       }else{
  //         return res.message;
  //       }

  //     },error:err => {
  //       console.log(err);

  //     }
  //   })
  // }

  setToken(token:any){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }


  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
