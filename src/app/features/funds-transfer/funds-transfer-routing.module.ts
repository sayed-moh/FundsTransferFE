import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsTransferComponent } from './funds-transfer.component';


const routes: Routes = [
  { path: '', component: FundsTransferComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsTransferRoutingModule { }
