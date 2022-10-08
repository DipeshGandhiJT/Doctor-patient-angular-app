import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  searchedText: string = "";
  clients: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
