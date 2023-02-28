import { EventEmitter } from "@angular/core";
import { User } from "./User.interface";


interface EmiterInterface{
    send(data:User):void;
    Subscribe():User;
}

export {
    EmiterInterface
}