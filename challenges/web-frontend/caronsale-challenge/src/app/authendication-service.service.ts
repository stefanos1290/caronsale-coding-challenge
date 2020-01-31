import { Injectable } from "@angular/core";
import { sha512 } from "js-sha512";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthendicationService {
  private BASE_URL =
    "https://caronsale-backend-service-dev.herokuapp.com/api/v1";

  constructor(private http: HttpClient) {}

  private hashPasswordWithCycles(plainTextPassword: string, cycles: number) {
    let hash = `${plainTextPassword}`;
    for (let i = 0; i < cycles; i++) {
      hash = sha512(hash);
    }
    return hash;
  }

  storeUserObject(obj: any) {
    Object.keys(obj).forEach(item => {
      localStorage.setItem(item, obj[item]);
    });
  }

  login(email: string, password: string) {
    const hashedPassword = this.hashPasswordWithCycles(password, 5);
    const url = this.BASE_URL + "/authentication/" + email;
    const payload = {
      password: hashedPassword
    };

    return this.http.put(url, payload, {});
  }
}
