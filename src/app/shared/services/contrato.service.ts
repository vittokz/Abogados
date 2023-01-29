import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IContrato } from "../model/contrato-model";

@Injectable({
  providedIn: "root",
})
export class ContratoService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Crear un contrato
  createContrato(contrato): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + "contratos/addContrato.php",
      contrato
    );
  }

  //RECUPERAR TODOS LOS CONTRATOS
  getAllContratos(): Observable<IContrato[]> {
    return this.http.get<IContrato[]>(
      this.apiUrl + "contratos/getAllContratos.php"
    );
  }

   //RECUPERAR CONTRATO POR IDENTIDAD
   getContratosByIdentidad(identidad:string): Observable<IContrato[]> {
    return this.http.get<IContrato[]>(this.apiUrl + "contratos/getAllContratosByIdentidad.php?identidad="+identidad);
  }
}
