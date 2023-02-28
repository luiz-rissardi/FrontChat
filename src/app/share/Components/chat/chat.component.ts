//angular
import { Component,Input, OnInit } from '@angular/core';

//interfaces

//services

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat:any;
  Conversas:any;
  constructor(){
    
  }

  ngOnInit(): void {
    console.log(this.chat)
  }

}
