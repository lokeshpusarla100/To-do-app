import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  ErrorMessage!:string;
  constructor(private formBuilder: FormBuilder,
              private apiservice:ApiServiceService,
              private auth:AuthService,
              private router:Router
              ) {}

  ngOnInit(): void {
    this.auth.logout()
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
     this.apiservice.login(this.loginForm.value).subscribe({
      next:res => {

        if(res.success){
          this.auth.setToken(res.token);
          this.router.navigate(['/dashboard'])
        }else{
          this.ErrorMessage = res.message

        }
      },error:error => {
        console.log(error);
      }
     })
    }


  }
}
