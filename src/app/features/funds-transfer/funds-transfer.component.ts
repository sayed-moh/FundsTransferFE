import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../home/services/auth.service';
import { fundsTransferController } from './controllers/funds-transfer.controller';
import { Account } from './models/account.model';
import { MessageService } from 'primeng/api';
import { TransferRequest } from './models/transfer-request.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferResponse } from './models/transfer-response.model';

@Component({
  selector: 'app-funds-transfer',
  standalone: false,
  templateUrl: './funds-transfer.component.html',
  styleUrls: ['./funds-transfer.component.scss'],
  providers: [MessageService]
})
export class FundsTransferComponent implements OnInit {
  amount: number | undefined = undefined;
  recipientAccountNumber: number | undefined = undefined;
  myAccountNumber: string | undefined = undefined;
  balance: string | undefined = undefined;
  submitLoading = false;
  accountLoading = true;
  username: string | undefined = undefined;
  transferRequest: TransferRequest = {
    accountNumberFrom: '',
    accountNumberTo: '',
    amount: 0
  };
  constructor(private authService: AuthService,
    private fundsTransferController: fundsTransferController,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
    this.getUserAccount();
  }

  getUserAccount() {
    const token = this.authService.getTokenValue();
    if (token) {
      this.fundsTransferController.getUserAccount(token).subscribe({
        next: (response: Account) => {
          this.balance = response.balance.toString();
          this.myAccountNumber = response.accountNumber;
          this.accountLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching user account:', error);
          this.accountLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error fetching user account', detail: error.error, life: 3000 });
          this.cdr.detectChanges();
        }
      })
    };
  }
  submit(fundsTransferForm: NgForm) {
    this.transferRequest.accountNumberFrom = this.myAccountNumber || '';
    this.transferRequest.accountNumberTo = this.recipientAccountNumber?.toString() || '';
    this.transferRequest.amount = this.amount || 0;
    this.submitLoading = true;
    const token = this.authService.getTokenValue();
    if (token) {
      this.fundsTransferController.transferFunds(token, this.transferRequest).subscribe({
        next: (response: TransferResponse) => {
          this.submitLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Transfer Successful', detail: "You transferred "+this.transferRequest.amount+" $ to "+response.userName+" with account number "+response.accountNumberTo , life: 3000 });
          fundsTransferForm.resetForm();
          this.balance = response.balance.toString();
        },
        error: (error: any) => {
          console.error('Error transferring funds:', error);
          this.submitLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error transferring funds', detail: error.error, life: 3000 });
        }
      });
    }
  }
  isPositiveNumber(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode === '-') {
      event.preventDefault();
      return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
