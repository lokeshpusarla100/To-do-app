import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiservice:ApiServiceService
               ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
       this.apiservice.register(this.signupForm.value)

      // Redirect to the login page (make sure you've set up routing)
      this.router.navigate(['/login']);
    }
  }
}
