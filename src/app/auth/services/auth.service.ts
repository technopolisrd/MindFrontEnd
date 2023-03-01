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
  private refreshTokenTimeout: any;

  get user(): IAuthUser {
    return {...this.user};
  }

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: max-line-length
  register(body: IRegisterUser): Observable<IRegisterUserResponse> {

    const url: string = `${this.baseUrl}/accounts/register`;

    return this.http.post<IRegisterUserResponse>(url, body, { withCredentials: true});

  }

  login(body: IAuthUser): Observable<IAuthResponse> {
    const url: string = `${this.baseUrl}/accounts/authenticate`;

    return this.http.post<IAuthResponse>(url, body, { withCredentials: true})
      .pipe(
        tap(resp => {
          if (resp.id > "0") {
            sessionStorage.setItem("token", resp.jwtToken!);
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
          }
        }),
        map(resp => resp.id),
        catchError(err => of(err.message))
      );
  }

  validarToken(): Observable<boolean> {

    const url: string = `${this.baseUrl}/accounts/refresh-token`;

    // tslint:disable-next-line: typedef
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     "token": sessionStorage.getItem("token") || ""
    //   }),
    //   withCredentials: true
    //  };

    return this.http.post<IAuthResponse>(url, {}, { withCredentials: true })
      .pipe(
        map(resp => {
          sessionStorage.setItem("token", resp.jwtToken);
          this.startRefreshTokenTimer();

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
    clearTimeout(this.refreshTokenTimeout);
  }

  private startRefreshTokenTimer(): void {
    this.refreshTokenTimeout = setTimeout(() => this.validarToken().subscribe(), 60000);
  }

}
