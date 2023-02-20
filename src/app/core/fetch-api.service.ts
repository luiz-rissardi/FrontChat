import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FetchApiService {

  constructor(private http:HttpClient) { }

  login(email:string,password:string){
    return this.http.post("https://apichat.herokuapp.com/api/login",{ email , password },{
      headers:{
        "Content-Type":"application/json",
        "x-api-key":"50136b29-2ecf-493a-8f12-4e0c03d33272"
      }
    })
  }
}
