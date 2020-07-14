import { Observable } from "rxjs";
import { DriverMasterService } from '@app/_services';
import { DriverMaster } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-driver-master",
  templateUrl: "./driver-master.component.html",
  styleUrls: ["./driver-master.component.css"]
})
export class DriverMasterComponent implements OnInit {

  masters: Observable<DriverMaster[]>;

  searchTerm = '';

  constructor(private service: DriverMasterService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.masters = this.service.getAllDriverMaster();
  }

  onSearchTermChange(): void {
    if(this.searchTerm != '')
      this.masters = this.service.searchDriverMaster(this.searchTerm);
    else
      this.reloadData();
  }

  deleteDriver(id: number){
    this.service.deleteDriverMaster(id).subscribe(
      data => {
        this.reloadData();
      },
      error => console.log(error));
  }


}
