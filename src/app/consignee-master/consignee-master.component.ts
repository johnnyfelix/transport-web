import { Observable } from "rxjs";
import { ConsigneeMasterService } from '@app/_services';
import { ConsigneeMaster } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-consignee-master",
  templateUrl: "./consignee-master.component.html",
  styleUrls: ["./consignee-master.component.css"]
})
export class ConsigneeMasterComponent implements OnInit {
  masters: Observable<ConsigneeMaster[]>;
  searchTerm = '';

  constructor(private service: ConsigneeMasterService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.masters = this.service.getAllConsigneeMaster();
  }

  onSearchTermChange(): void {
    if(this.searchTerm != '')
      this.masters = this.service.searchConsigneeMaster(this.searchTerm);
    else
      this.reloadData();
  }

  deleteConsigee(id: number){
    this.service.deleteConsigneeMaster(id).subscribe(
      data => {
        this.reloadData();
      },
      error => console.log(error));
  }


}
