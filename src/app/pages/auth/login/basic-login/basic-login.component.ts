import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAuth } from "../../../../shared/model/userAuth";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: "app-basic-login",
  templateUrl: "./basic-login.component.html",
  styleUrls: ["./basic-login.component.scss"],
})
export class BasicLoginComponent implements OnInit {
  isLogueado:boolean;
  formLogin: FormGroup;
  isError = false;
  usuario: UserAuth ={
    identidad:'',
    clave:''
};
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ruta: Router
  ) {}

  ngOnInit() {
    document.querySelector("body").setAttribute("themebg-pattern", "theme1");
    this.crearFormulario();
  }

  crearFormulario() {
    this.formLogin = this.formBuilder.group({
      identidad: ["", Validators.required],
      clave: ["", Validators.required],
    });
  }

  onLogin(){
    const form = this.formLogin.value;
    this.usuario.identidad=form.identidad;
    this.usuario.clave = form.clave;
     this.authService.loginUsuario(this.usuario.identidad, this.usuario.clave).subscribe(
      data=>{
          if(data){
              console.log(data);
              this.isLogueado=true;
              this.authService.setUser(data);
              const token = this.usuario.identidad;
              this.authService.setToken(token);
              this.ruta.navigateByUrl('/abogados');
              this.isError = false;
          }
          else{
              this.isLogueado=false;
               this.formLogin.reset();
              
          }
      }
    );
  }

  
}
