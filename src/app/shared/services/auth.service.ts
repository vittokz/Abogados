import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = environment.apiUrl + "auth-user/";
  headers: any = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) {}

  loginUsuario(identidad: string, clave: string): Observable<any> {
    let options = {
      identidad: identidad,
      clave: clave,
    };
    return this.http.post(
      <any>this.url + "loginUser.php",
      options,
      this.headers
    );
  }

  setUser(user): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
    console.log("Current-creado: " + user_string);
  }

  setToken(token): void {
    localStorage.setItem("accesToken", token);
  }

  getToken() {
    localStorage.getItem("accesToken");
  }
}
