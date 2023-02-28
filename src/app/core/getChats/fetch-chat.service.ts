import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchChatInterface } from 'src/app/share/interfaces/FetchService.interface';
import { Observable, Subscriber, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchChatService implements FetchChatInterface{

  constructor(private http:HttpClient) { }

  getchat(id: number):Observable<any> {
    try {
      return this.http.get(`https://chat-api.herokuapp.com/api/getChat/${id}`,{
        headers:{
          "x-api-key": "4a2b7625-c821-4b3a-9071-dbcd56b182de"
        }
      })
    } catch (error) {
      return new Observable(Subscriber =>{
        Subscriber.next(new Error("não foi possivel pegar os chat"))
      })
    }
  }

  CreateChat(){
    try {
      return this.http.post("https://chat-api.herokuapp.com/api/startChat",{},{
        headers:{
          "Content-Type": "application/json",
          "x-api-key": "4a2b7625-c821-4b3a-9071-dbcd56b182de"
        }
      })
    } catch (error) {
      return new Observable(Subscriber =>{
        Subscriber.next(false)
      })
    }
  }

  SendMessage(chats:any,id:number):Observable<any>{
    try {
      return this.http.put("https://chat-api.herokuapp.com/api/sendMessage",JSON.stringify({chats,id}),{
        headers:{
          "Content-Type": "application/json",
          "x-api-key": "4a2b7625-c821-4b3a-9071-dbcd56b182de"
        }
      })
    } catch (error) {
      return new Observable(Subscriber =>{
        Subscriber.next(error)
      })
    }
  }


}
