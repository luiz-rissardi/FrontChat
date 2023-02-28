//angular
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';
//services
import { FetchApiService } from 'src/app/core/fetch/fetch-api.service';
import { ValidateForm } from 'src/app/share/validation/validate';
import { EmiterService } from 'src/app/core/emiter/emiter.service';
//interfaces
import { FetchApiInterface } from 'src/app/share/interfaces/FetchService.interface';
import { Validate } from 'src/app/share/interfaces/validate.interface';
import { EmiterInterface } from 'src/app/share/interfaces/Emiter.interface';
import { User } from 'src/app/share/interfaces/User.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: "root"
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  validEmail: boolean = true;
  submit: boolean = false;
  toManyRequest: boolean = false


  usuario: User = {
    phone: 0,
    nome: '',
    email: '',
    chats: []
  }


  constructor(private route: Router, @Inject(EmiterService) private emiter: EmiterInterface, private builder: FormBuilder, @Inject(FetchApiService) private service: FetchApiInterface, @Inject(ValidateForm) private validate: Validate) {
    this.form = builder.group({
      email: [
        null,
        Validators.required,
      ],
      senha: [
        null,
        Validators.required
      ]
    })
  }

  async logar() {
    const email = this.form.get("email")?.value;
    const password = this.form.get("senha")?.value;
    this.submit = true;
    this.validEmail = this.validate.validateEmail(email)

    if (this.validEmail && password) {
      this.service.login(email, password).subscribe({
        next: (data: any) => {
          this.usuario = data.dados[0]
          if (this.usuario !== undefined) {
            this.emiter.send(this.usuario)
            this.route.navigate(["/home"])
          }
        },
        error: (erro) => {
          this.toManyRequest = erro
        }
      })

    }
  }

  ngOnInit(): void {
  }

}
