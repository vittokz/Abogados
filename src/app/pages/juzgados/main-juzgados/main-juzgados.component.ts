import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IJuzgado } from "../../../shared/model/juzgado-model";
import { JuzgadoService } from "../../../shared/services/juzgado.service";

import { LocalidadesService } from "../../../shared/services/localidades.service";
import {
  IDepartamento,
  IMunicipio,
} from "../../../shared/model/localidades-model";
import { AlertService } from "../../../shared/services/alert.service";
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: "Russia",
    flag: "f/f3/Flag_of_Russia.svg",
    area: 17075200,
    population: 146989754,
  },
  {
    name: "France",
    flag: "c/c3/Flag_of_France.svg",
    area: 640679,
    population: 64979548,
  },
  {
    name: "Germany",
    flag: "b/ba/Flag_of_Germany.svg",
    area: 357114,
    population: 82114224,
  },
  {
    name: "Portugal",
    flag: "5/5c/Flag_of_Portugal.svg",
    area: 92090,
    population: 10329506,
  },
  {
    name: "Canada",
    flag: "c/cf/Flag_of_Canada.svg",
    area: 9976140,
    population: 36624199,
  },
  {
    name: "Vietnam",
    flag: "2/21/Flag_of_Vietnam.svg",
    area: 331212,
    population: 95540800,
  },
  {
    name: "Brazil",
    flag: "0/05/Flag_of_Brazil.svg",
    area: 8515767,
    population: 209288278,
  },
  {
    name: "Mexico",
    flag: "f/fc/Flag_of_Mexico.svg",
    area: 1964375,
    population: 129163276,
  },
  {
    name: "United States",
    flag: "a/a4/Flag_of_the_United_States.svg",
    area: 9629091,
    population: 324459463,
  },
  {
    name: "India",
    flag: "4/41/Flag_of_India.svg",
    area: 3287263,
    population: 1324171354,
  },
  {
    name: "Indonesia",
    flag: "9/9f/Flag_of_Indonesia.svg",
    area: 1910931,
    population: 263991379,
  },
  {
    name: "Tuvalu",
    flag: "3/38/Flag_of_Tuvalu.svg",
    area: 26,
    population: 11097,
  },
  {
    name: "China",
    flag: "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    area: 9596960,
    population: 1409517397,
  },
];

@Component({
  selector: "app-main-juzgados",
  templateUrl: "./main-juzgados.component.html",
  styleUrls: ["./main-juzgados.component.scss"],
})
export class MainJuzgadosComponent implements OnInit {
  formJuzgado: FormGroup;
  formEditarJuzgado: FormGroup;
  listJuzgados: IJuzgado[];
  juzgadoEditado: IJuzgado;
  auxListJuzgados: IJuzgado[] = [];
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[] = [];
  respuestaEditar: boolean;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  closeResult = "";
  constructor(
    private fb: FormBuilder,
    private juzgadoService: JuzgadoService,
    private localidadesServices: LocalidadesService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listAllJuzgados();
    this.getDepartamentos();
    this.crearFormulario();
  }

  //RECUPERAR TODOS LOS DEPARTAMENTOS
  getDepartamentos() {
    this.localidadesServices.getAllDepartamentos().subscribe((data) => {
      this.listDepartamentos = data;
    });
  }
  //SELECCIONAR MUNICPIO SEGUN DEPARTAMENTO SELECCIONADO
  selecDepartamento(eventDepartamento) {
    this.localidadesServices
      .getAllMunicipios(eventDepartamento.target.value)
      .subscribe((data) => {
        this.listMunicipios = data;
      });
  }

  refreshCountries() {
    this.auxListJuzgados = this.listJuzgados
      .map((juzgado, i) => ({ id: i + 1, ...juzgado }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  //Crear campos del forlumario
  crearFormulario() {
    this.formJuzgado = this.fb.group({
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      nombre: ["", Validators.required],
      usuarioRegistro: [],
    });
    this.formEditarJuzgado = this.fb.group({
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      nombre: ["", Validators.required],
      usuarioRegistro: [],
    });
  }

  //REGISTRAR UN JUZGADO
  registrarJuzgado() {
    const formData = new FormData();
    formData.append("nombre", this.formJuzgado.get("nombre").value);
    formData.append("municipio", this.formJuzgado.get("municipio").value);
    formData.append("usuarioRegistro", localStorage.getItem("accesToken"));
    this.juzgadoService.createJuzgado(formData).subscribe((respuesta) => {
      if (respuesta) {
		this.listAllJuzgados();
        this.formJuzgado.reset();
        this.alertService.toast();
      }
    });
  }

  //EDITAR UN JUZGADO
  editarJuzgado() {
    const formData = new FormData();
	formData.append("idJuzgado", this.juzgadoEditado.idJuzgado);
    formData.append("nombre", this.formEditarJuzgado.get("nombre").value);
    formData.append("municipio", this.formEditarJuzgado.get("municipio").value);
    formData.append("usuarioRegistro", localStorage.getItem("accesToken"));
    this.juzgadoService.updateJuzgado(formData).subscribe((respuesta) => {
      if (respuesta.resul===1) {
		this.listAllJuzgados();
       this.respuestaEditar=true;
      }
    });
  }
  //RECUPERAR TODOS LOS JUZGADOS
  listAllJuzgados() {
    this.juzgadoService.getAllJuzgados().subscribe((juzgados) => {
      this.listJuzgados = juzgados;
      this.collectionSize = this.listJuzgados.length;
      this.refreshCountries();
    });
  }

  //MODALES
  open(content, juzgado: IJuzgado) {
    this.juzgadoEditado = juzgado;
	this.respuestaEditar=false;
    this.formEditarJuzgado.get("nombre").setValue(juzgado.nombre);
    this.formEditarJuzgado.get("municipio").setValue(juzgado.ciudad);
    this.formEditarJuzgado.get("departamento").setValue(juzgado.idDepar);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
