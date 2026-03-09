import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PrimeModule } from '../../../assets/prime.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    WelcomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    PrimeModule,
    FormsModule,
  ],
})
export class HomeModule { }
