import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {HotToastService } from '@ngneat/hot-toast';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  error:string;
  constructor(private authService: AuthService,private router:Router,private toast:HotToastService) {}
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(authform:NgForm) {
    const {username,email,password} = authform.value;
    if(this.isLoginMode){
      this.authService.Login(email,password)
      .pipe(this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in ...',
        error: 'Login failed'
      }),)
      .subscribe(()=>{
        this.router.navigate(['']);
      })
      console.log(authform);
      
    }
    else {
      this.authService.Signup(username,email,password)
      .pipe(this.toast.observe({
        success: 'Congrats! You are now signed up',
        loading: 'Logging in ...',
        error: ({message}) => `${message}`
      }))
      .subscribe(()=>{
        this.router.navigate(['']);
      })
      console.log(authform);
    }
  }

  onHandleError(){
    this.error = null;
  }
}
