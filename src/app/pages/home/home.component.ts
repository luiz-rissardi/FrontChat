//angular
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { io } from "socket.io-client";


//service
import { EmiterService } from 'src/app/core/emiter/emiter.service';
import { FetchChatService } from 'src/app/core/getChats/fetch-chat.service';
import { FetchApiService } from 'src/app/core/fetch/fetch-api.service';

//interface
import { FetchApiInterface } from 'src/app/share/interfaces/FetchService.interface';
import { EmiterInterface } from 'src/app/share/interfaces/Emiter.interface';
import { FetchChatInterface } from 'src/app/share/interfaces/FetchService.interface';
import { User } from 'src/app/share/interfaces/User.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Usuario: User;
  Chat: any;
  Form: FormGroup;
  ChatIdAtual: number = 0;
  Socket : any;
  constructor(private formulario: FormBuilder, private modalConfig: NgbModalConfig, private modal: NgbModal, @Inject(EmiterService) private emiter: EmiterInterface, @Inject(FetchChatService) private ApiChat: FetchChatInterface, @Inject(FetchApiService) private ApiService: FetchApiInterface) {
    this.Usuario = emiter.Subscribe();
    this.modalConfig.backdrop = "static"
    this.Form = this.formulario.group({
      phone1: [],
    })
  }

  ngOnInit(): void {
    this.Socket = io("https://chat-api.herokuapp.com/", {
      transports: ['websocket']
   })

   this.Socket.on("message",(data:any)=>{
    this.Chat.chat[0].chats = data;
  })
  }

  open(modal: any) {
    this.modal.open(modal)
  }


  getChat(chatId: number, phoneUser: number) {
    this.ChatIdAtual = chatId;
    this.Socket.emit("connectRoom",this.ChatIdAtual)
    this.ApiChat.getchat(chatId).subscribe((data: any) => {
      this.Chat = data;
      this.Chat.phoneUser = Number(phoneUser);
      this.Chat.yourphone = this.Usuario.phone;
      console.log(this.Chat)
    })
  }

  addContact() {
    const phone1 = this.Usuario.phone;
    const phone2 = Number(this.Form.get("phone1")?.value);
    this.ApiChat.CreateChat().subscribe((chatId: any) => {
      if (chatId.id) {
        console.log(chatId.id)
        this.ApiService.InitChat(phone1, phone2, chatId.id).subscribe(data => {

        })
      }
    })
  }

  sendMessage(message: string) {
    const phone = this.Usuario.phone
    const messager = { [phone]: message }
    this.Chat.chat[0].chats.push(messager)
    this.ApiChat.SendMessage(this.Chat.chat[0].chats, this.ChatIdAtual).subscribe(data => {
      console.log(data)
      this.Socket.emit("sendMessage",this.Chat.chat[0].chats)
    })
  }
}
