import { Component, Inject, Injectable, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { FetchApiService } from 'src/app/core/fetch-api.service';
import { User } from 'src/app/share/interfaces/User.interface';
import { Validate } from 'src/app/share/interfaces/validate.interface';
import { ValidateForm } from 'src/app/share/class/validate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn:"root"
})

export class LoginComponent implements OnInit{

  form:FormGroup;
  validEmail:boolean = true;
  submit:boolean = false;
  usuario:User = {
    phone: 0,
    nome: '',
    email: '',
    chats: []
  }

  constructor(private dom:Renderer2,private builder:FormBuilder,private service:FetchApiService,@Inject(ValidateForm) private validate:Validate){
    this.form = builder.group({
      email:[
        null,
        Validators.required,
      ],
      senha:[
        null,
        Validators.required
      ]
    })
  }

  async logar(){
    const email = this.form.get("email")?.value;
    const password = this.form.get("senha")?.value;
    this.submit = true;
    this.validEmail = this.validate.validateEmail(email)

    this.dom.selectRootElement("#emailId").addEventListener("change",()=>{
      this.dom.selectRootElement("#emailId").style = "border:none; border-bottom:1px solid black;"
    })
    
    if(this.validEmail){
      this.service.login(email,password).subscribe(async (data:any) =>{
        this.usuario = data.dados[0]
        console.log(this.usuario)
      })
    }else{
      this.dom.selectRootElement("#emailId").style = "border:1px solid red"
    }
  }

  ngOnInit(): void {
    
  }

}
