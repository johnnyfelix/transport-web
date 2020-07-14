import {Observable} from 'rxjs';
import {AdminMasterService} from '@app/_services';
import {AdminMaster, Company} from '@app/_models';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.css']
})
export class AdminMasterComponent implements OnInit {

  masters: Observable<AdminMaster[]>;
  masterTypes: string[];
  searchTerm = '';
  masterValue = '';
  selectedMasterType: string = '';

  constructor(private service: AdminMasterService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadType();
  }

  loadType() {
    this.service.getAdminMasterType().subscribe(
      masterTypeList => {
        this.masterTypes = masterTypeList as string[];
        this.loadMasterValues(this.masterTypes[0]);
        this.selectedMasterType = this.masterTypes[0];
      }
    );
  }

  loadMasterValues(type: string) {
    this.masters = this.service.getAdminMaster(type);
  }

  setCurrentMaster(master: any) {
    console.log('Selected master ' + master)
    this.selectedMasterType = master;
    this.loadMasterValues(master);
  }

  onSearchTermChange(): void {
    this.masters = this.service.searchAdminMaster(this.selectedMasterType, this.searchTerm);
  }

  createNewMaster() {
    if (this.masterValue != "") {
      var adminMasterObj = {
        type: this.selectedMasterType,
        value: this.masterValue
      }
      this.service.createAdminMaster(adminMasterObj).subscribe(
        data => {
          this.masterValue = "";
          this.loadMasterValues(this.selectedMasterType);
        },
        error => {
          console.log(error);
          this.masterValue = "";
        });
    }

  }

  deleteAdminMaster(id: number) {
    this.service.deleteAdminMaster(id).subscribe(
      data => {
        this.loadMasterValues(this.selectedMasterType);
      },
      error => console.log(error));
  }

}
