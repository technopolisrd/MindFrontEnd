import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    title: ["Mr", Validators.nullValidator],
    firstName: ["Jose", [Validators.required]],
    lastName: ["Mateo", [Validators.required]],
    email: ["jmateo@gmail.com", [Validators.required, Validators.email]],
    linkCV: ["url1", Validators.nullValidator],
    englishLevel: ["B1", Validators.nullValidator],
    technicalSkills: ["C#", Validators.nullValidator],
    password: ["Abcd1234", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["Abcd1234", [Validators.required, Validators.minLength(6)]],
    acceptTerms: [true, Validators.nullValidator]
  });

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService) { }

  registro(): void {

    // tslint:disable-next-line: max-line-length
    const { title, firstName, lastName, email, linkCV, englishLevel, technicalSkills, password, confirmPassword, acceptTerms } = this.miFormulario.value;

    // tslint:disable-next-line: max-line-length
    this.authService.register(title, firstName, lastName, email, linkCV, englishLevel, technicalSkills, password, confirmPassword, acceptTerms)
      .subscribe(resp => {
        if (resp.message.includes("Registro realizado con éxito")) {
          Swal.fire("Success", resp.message, "success");
          this.route.navigateByUrl("/dashboard");
        } else {
          Swal.fire("Error", "Usuario no pudo ser registrado correctamente, por favor revise las informaciones", "error");
        }
      });

  }
}