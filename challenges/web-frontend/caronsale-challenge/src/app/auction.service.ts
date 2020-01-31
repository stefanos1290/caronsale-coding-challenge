import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuctionService {
  private BASE_URL =
    "https://caronsale-backend-service-dev.herokuapp.com/api/v1";
  constructor(private http: HttpClient) {}
  //  private updateAuctions = setInterval(() => this.getAuctions(), 2000);

  getAuctions() {
    // /auction/salesman/{userId}/_all
    const userId = localStorage.getItem("userId");
    const url = this.BASE_URL + "/auction/salesman/" + userId + "/_all";
    const token = localStorage.getItem("token");
    return this.http.get(url, {
      headers: {
        "Content-Type": "application/json",
        authtoken: token,
        userid: userId
      }
    });
  }
}
