import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeModule } from '../assets/prime.module';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/aura';
@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    PrimeModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
     providePrimeNG({
      theme: {
        preset: Lara,
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
