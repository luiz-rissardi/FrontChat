import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchApiInterface } from '../../share/interfaces/FetchService.interface';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root'
})

export class FetchApiService implements FetchApiInterface {

  constructor(private http: HttpClient) { }

  /*
  teste() {
    const serve = io("http://localhost:3000", {
      transports: ['websocket']
   })

    serve.on("connect", () => {
      serve.emit("connectRoom", "sala1234")
    })

    serve.on("message", (msg) => {
      console.log(msg)
    })
  }*/

  login(email: string, password: string): Observable<any> {
    try {
      return this.http.post("https://apichat.herokuapp.com/api/login", { email, password }, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "50136b29-2ecf-493a-8f12-4e0c03d33272"
        }
      })
    } catch (error) {
      return new Observable(Subscriber => {
        Subscriber.error(true)
      })
    }
  }

  InitChat(phone1: number, phone2: number, chatId: number): Observable<any> {
    try {
      return this.http.put("https://apichat.herokuapp.com/api/createChat", { phone1, phone2, chatId }, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "50136b29-2ecf-493a-8f12-4e0c03d33272"
        }
      })
    } catch (error) {
      return new Observable(Subscriber => {
        Subscriber.error(false)
      })
    }
  }

  Create(nome: string, phone: number, email: string, password: string, chats: Array<any>): Observable<any> {
    try {
      return this.http.post("https://apichat.herokuapp.com/api/services", { nome, email, phone, password, chats }, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "50136b29-2ecf-493a-8f12-4e0c03d33272"
        }
      })
    } catch (error) {
      return new Observable(Subscriber => {
        Subscriber.next(false)
      })
    }
  }
}
