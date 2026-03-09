import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { Account } from '../models/account.model';
import { TransferRequest } from '../models/transfer-request.model';

@Injectable({
  providedIn: 'root'
})
export class fundsTransferController {  
    uri = environment.apiUrl
    constructor(private http: HttpClient) { }
    getUserAccount(Token:String){
        return this.http.get<Account>(this.uri+'/api/get-account',{headers:{Authorization: `${Token}`}});
    }
    transferFunds(Token:String,transferRequest:TransferRequest){
        return this.http.post<string>(this.uri+'/api/transfer',transferRequest,{headers:{Authorization: `${Token}`}});     
    }

}