import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EmiterInterface } from 'src/app/share/interfaces/Emiter.interface';
import { User } from 'src/app/share/interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class EmiterService implements EmiterInterface {

  private emiter?:any
  constructor() { }

  Subscribe():User{
    return this.emiter
  }
  
  send(data: User): void {
    this.emiter = data
  }
}
