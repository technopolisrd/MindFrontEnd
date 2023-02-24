import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService) {
    const token: string = sessionStorage.getItem("token") || "";

    if (token !== "") {
      this.route.navigateByUrl("/dashboard");
    }
  }

  login(): void {

    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp.id !== "0") {
          this.route.navigateByUrl("/dashboard");
        } else {
          Swal.fire("Error", "Bad user or password", "error");
        }
      });
  }
}
