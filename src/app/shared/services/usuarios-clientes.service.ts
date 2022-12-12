import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUsuario } from '../model/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosClientesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

//Crear un usuario
  createUsuario(usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl + "usuarios/addUsuario.php", usuario);
  }

  //RECUPERAR TODOS LOS USUARIOS
  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUrl + "usuarios/getAllUsuarios.php");
  }
}
