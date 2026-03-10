import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginController } from '../../controllers/login.controller';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../models/login-response.model';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  username: string | undefined = undefined;
  password: string | undefined = undefined;
  loginLoading = false;
  isNewUser = false;
   constructor(private loginController: LoginController, private authService: AuthService, private router: Router, private messageService: MessageService) { }
  loginOrSignUP(loginForm: NgForm) {
    this.loginLoading = true;
    if (this.username && this.password) {
      if (this.isNewUser) {
        this.loginController.signUp({username: this.username, password: this.password}).subscribe({
          next: (response) => {
            this.loginUser(response, loginForm);
            
          },
          error: (error) => {
            this.loginUserFailed(error);
          },});
      } else {
        this.loginController.login({username: this.username, password: this.password}).subscribe({
          next: (response) => {
            this.loginUser(response, loginForm);
          },
          error: (error) => {
            this.loginUserFailed(error);
          },
        
        });
      }
    }
    //redirect to next page
  }
  loginUser(response: LoginResponse, loginForm: NgForm){
    this.authService.setAuth(response);
    this.loginLoading = false;
    this.router.navigate(['/transfer']);
     loginForm.resetForm();
  }
  loginUserFailed(error: any){
    this.messageService.add({ severity: 'error', summary: this.isNewUser? 'Sign Up Failed': 'Login Failed', detail: error.error, life: 3000 });
    this.loginLoading = false;
  }
  toggleLogInOption(loginForm: NgForm) {
    this.isNewUser = !this.isNewUser;
    loginForm.resetForm();
  }

 

}
