import { Observable } from "rxjs";
import { FactoryMasterService } from '@app/_services';
import { FactoryMaster } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-factory-master",
  templateUrl: "./factory-master.component.html",
  styleUrls: ["./factory-master.component.css"]
})
export class FactoryMasterComponent implements OnInit {

  masters: Observable<FactoryMaster[]>;

  searchTerm = '';

  constructor(private service: FactoryMasterService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.masters = this.service.getAllFactoryMaster();
  }

  onSearchTermChange(): void {
    if(this.searchTerm != '')
      this.masters = this.service.searchFactoryMaster(this.searchTerm);
    else
      this.reloadData();
  }

  deleteFactory(id: number){
    this.service.deleteFactoryMaster(id).subscribe(
      data => {
        this.reloadData();
      },
      error => console.log(error));
  }


}
