import { Observable } from "rxjs";
import { VehicleMasterService } from '@app/_services';
import { VehicleMaster } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-vehicle-master",
  templateUrl: "./vehicle-master.component.html",
  styleUrls: ["./vehicle-master.component.css"]
})
export class VehicleMasterComponent implements OnInit {

  masters: Observable<VehicleMaster[]>;

  searchTerm = '';

  constructor(private service: VehicleMasterService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.masters = this.service.getAllVehicleMaster();
  }

  onSearchTermChange(): void {
    if(this.searchTerm != '')
      this.masters = this.service.searchVehicleMaster(this.searchTerm);
    else
      this.reloadData();
  }

  deleteVehicle(id: number){
    this.service.deleteVehicleMaster(id).subscribe(
      data => {
        this.reloadData();
      },
      error => console.log(error));
  }


}
