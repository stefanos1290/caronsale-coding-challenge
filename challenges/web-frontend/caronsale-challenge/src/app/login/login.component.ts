import { Component, OnInit } from "@angular/core";
import { AuthendicationService } from "../authendication-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  emailPlaceholder = "Email";
  passwordPlaceholder = "Password";
  errorMessage = "";

  constructor(
    private authenticationService: AuthendicationService,
    private router: Router
  ) {}

  ngOnInit() {
    const isauthenticated = localStorage.getItem("authenticated");
    if (isauthenticated) {
      this.router.navigate(["auction"]);
    }
  }

  onError() {
    this.errorMessage = "Something went wrong please try again!";
  }

  onSubmit(submittedForm) {
    const loginReq = this.authenticationService.login(
      submittedForm.value.email,
      submittedForm.value.password
    );
    loginReq.subscribe(
      data => {
        this.authenticationService.storeUserObject(data);
        this.router.navigate(["auction"]);
      },
      error => {
        console.log("login error: ", error);
        this.onError();
      }
    );
  }
}
