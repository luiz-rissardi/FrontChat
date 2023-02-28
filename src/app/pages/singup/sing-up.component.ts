//angular
import { Component, Inject } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

//services
import { FetchApiService } from 'src/app/core/fetch/fetch-api.service';

//interfaces
import { FetchApiInterface } from 'src/app/share/interfaces/FetchService.interface';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {

  Form:FormGroup
  constructor(@Inject(FetchApiService) private FetchApi:FetchApiInterface, private formbuilder:FormBuilder){
    this.Form  = formbuilder.group({
      nome:[],
      phone:[],
      email:[],
      password:[]
    })
  }

  Cadastar(){
    const nome = this.Form.get("nome")?.value;
    const phone = this.Form.get("phone")?.value;
    const email = this.Form.get("email")?.value;
    const password = this.Form.get("password")?.value;
    if(nome && phone && email && password){
      this.FetchApi.Create(nome,phone,email,password,[]).subscribe(data =>{
        console.log(data)
      })
    }
    else{
      console.log("invalido")
    }
  }
}
