import { Observable } from "rxjs";


interface FetchApiInterface{
    login(email:string,password:string):Observable<any>;
    InitChat(phone1:number,phone2:number,chatId:number):Observable<any>;
    Create(nome:string,phone:number,email:string,password:string,chats:Array<any>):Observable<any>;
}

interface FetchChatInterface{
    getchat(id:number):Observable<any>;
    CreateChat():Observable<any>;
    SendMessage(chats:any,id:number):Observable<any>;
}

export {
    FetchApiInterface,
    FetchChatInterface
}