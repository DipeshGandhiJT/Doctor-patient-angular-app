import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import axios from "axios";

@Component({
  selector: "app-consulting",
  templateUrl: "./consulting.component.html",
  styleUrls: ["./consulting.component.scss"],
})
export class ConsultingComponent implements OnInit {
  searchedText: string = "";
  sortedList: any = [];

  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    axios.get("http://localhost:3000/clients").then((res) => {
      res.data.map((client: any) => {
        client.consulting.map((consult: any) => {
          this.sortedList.push({
            id: client.id,
            name: client.name,
            date: consult.date,
            illness: consult.illness,
            prescription: consult.prescription,
          });
        });
      });
      this.sortedList = this.sortedList.sort((a: any, b: any) => {
        const t1: any = new Date(a.date);
        const t2: any = new Date(b.date);
        return t2 - t1;
      });
    });
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }

  openDetails(item: any) {
    const details = this.sortedList.find(
      (c: any) => c.id == item.id && c.illness == item.illness
    );
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(details);
    this.router.navigate([`clients/consulting/${item.id}`], { queryParams });
  }
}
