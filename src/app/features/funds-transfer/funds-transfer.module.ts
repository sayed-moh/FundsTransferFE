import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../../../assets/prime.module';
import { FundsTransferComponent } from './funds-transfer.component';
import { FundsTransferRoutingModule } from './funds-transfer-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    FundsTransferComponent,
  ],
  imports: [
    FundsTransferRoutingModule,
    CommonModule,
    PrimeModule,
    FormsModule,
  ],
})
export class FundsTransferModule { }
