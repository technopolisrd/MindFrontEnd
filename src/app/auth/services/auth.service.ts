import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { IAuthResponse, IAuthUser, IRegisterUser, IRegisterUserResponse } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  [x: string]: any;

  private baseUrl: string = environment.baseURL;
  private _user!: IAuthResponse;

  get user(): IAuthUser {
    return {...this.user};
  }

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: max-line-length
  register(title: string,
           firstName: string,
           lastName: string,
           email: string,
           linkCV: string,
           englishLevel: string,
           technicalSkills: string,
           password: string,
           confirmPassword: string,
           acceptTerms: boolean): Observable<IRegisterUserResponse> {

    const url: string = `${this.baseUrl}/accounts/register`;

    const body: IRegisterUser = {
      title,
      firstName,
      lastName,
      email,
      linkCV,
      englishLevel,
      technicalSkills,
      password,
      confirmPassword,
      acceptTerms
    };

    return this.http.post<IRegisterUserResponse>(url, body);

  }

  login(email: string, password: string): Observable<IAuthResponse> {
    const url: string = `${this.baseUrl}/accounts/authenticate`;

    const body: IAuthUser = {
      email,
      password
    };

    return this.http.post<IAuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.id > "0") {
            sessionStorage.setItem("token", resp.jwtToken!);
          }
        }),
        map(resp => resp.id),
        catchError(err => of(err.message))
      );
  }

  validarToken(): Observable<boolean> {

    const url: string = `${this.baseUrl}/accounts/refresh-token`;

    const headers: HttpHeaders = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    });

    return this.http.get<IAuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          sessionStorage.setItem("token", resp.jwtToken);

          this._user = {
            id: resp.id!,
            title: resp.title,
            firstName: resp.firstName,
            lastName: resp.lastName,
            email: resp.email!,
            linkCV: resp.linkCV,
            englishLevel: resp.englishLevel,
            role: resp.role,
            jwtToken: resp.jwtToken
          };

          return true;
        }),
        catchError(() => of(false))
      );
}

  logout(): void {
    sessionStorage.clear();
  }

}
