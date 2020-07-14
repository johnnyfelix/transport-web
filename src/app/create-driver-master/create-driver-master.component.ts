import { DriverMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverMasterService } from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-driver-master',
  templateUrl: './create-driver-master.component.html',
  styleUrls: ['./create-driver-master.component.css']
})
export class CreateDriverMasterComponent implements OnInit {

  driverMaster: DriverMaster;
  error: boolean;
  success: boolean;
  form: FormGroup;
  message: string;

  constructor(
    private driverMasterService: DriverMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.driverMaster = new DriverMaster();
    this.message = "";
  }

  reactiveForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lcNumber: ['', [Validators.required]],
      employeeCode: [''],
      aCard: [''],
    });

  }

  save() {
    this.driverMasterService.createDriverMaster(this.driverMaster)
      .subscribe(
        data => {
          this.error = false;
          this.success = true;
          this.message = "Master Created Successfully!";

        },
        error => {
          this.error = true;
          this.success = false;
          this.message = error.error.message;
          this.error = true;
        });
    this.driverMaster = new DriverMaster();

  }

  onSubmit() {
    if (this.form.valid) {
      this.driverMaster = this.form.value as DriverMaster;
      this.save();
    }

  }

  gotoList() {
    this.router.navigate(['/driver-master']);
  }
}
