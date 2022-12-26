import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartamento, IMunicipio } from '../../../shared/model/localidades-model';
import { LocalidadesService } from '../../../shared/services/localidades.service';
import { AbogadosService } from '../../../shared/services/abogados.service';
import { IUsuario } from '../../../shared/model/usuario-model';
import { UsuariosClientesService } from '../../../shared/services/usuarios-clientes.service';
import { ContratoService } from '../../../shared/services/contrato.service';
import { IContrato } from '../../../shared/model/contrato-model';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.scss']
})
export class MainClientComponent implements OnInit {
   formClient: FormGroup;
   listContratosEncontrados: IContrato[];
   apiUrl: string = environment.apiUrl;
   constructor(private formBuilder: FormBuilder,
    private usuarioClienteService: UsuariosClientesService,
    private abogadosService: AbogadosService,
    private contratosService: ContratoService,
    private localidadesServices: LocalidadesService,) {}

  ngOnInit() {
    this.crearFormulario();
  }
  //CREAR CAMPOS DEL FORMULARIO
  crearFormulario() {
    this.formClient = this.formBuilder.group({
      identidad: ["", Validators.required],
    });
  }

  //BUSCAR CLIENTE
  buscarCliente(){
    const form = this.formClient.value;
    this.contratosService.getContratosByIdentidad(form.identidad).subscribe(
      contrato=>{
        this.listContratosEncontrados = contrato;
      }
    );
  }
}
