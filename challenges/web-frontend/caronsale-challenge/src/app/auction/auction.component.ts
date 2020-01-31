import { Component, OnInit } from "@angular/core";
import { AuctionService } from "../auction.service";

@Component({
  selector: "app-auction",
  templateUrl: "./auction.component.html",
  styleUrls: ["./auction.component.css"]
})
export class AuctionComponent implements OnInit {
  items = [];
  errorMessage = null;
  constructor(private auctionService: AuctionService) {}

  getAuctions() {
    this.auctionService.getAuctions().subscribe(
      (data: any) => {
        console.log(data);
        this.items = data.map(x => {
          const remainingTimeDate = new Date(x.endingTime);
          return {
            ...x,
            remainingTime: `${remainingTimeDate.getHours()}h:${remainingTimeDate.getMinutes()}m:${remainingTimeDate.getSeconds()}s`
          };
        });
      },
      error => {
        this.errorMessage = true;
        console.log("error auction component: ", error);
      }
    );
  }

  ngOnInit() {
    this.getAuctions();
    setInterval(() => this.getAuctions(), 20000);
  }
}
