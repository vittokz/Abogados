import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IDepartamento, IMunicipio } from '../model/localidades-model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  apiUrl: string = environment.apiUrl;
  listDepartamentos: IDepartamento[]
  constructor(private http: HttpClient) {}

  getAllDepartamentos(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(this.apiUrl + "departamento/getAllDepartamentos.php");
  }

  getAllMunicipios(idDepartamento: string): Observable<IMunicipio[]> {
    return this.http.get<IMunicipio[]>(
      this.apiUrl + 'departamento/getMunicipiosByIdDepar.php?idDepar=' + idDepartamento);
  }
}
