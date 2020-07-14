import { VehicleMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleMasterService } from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-vehicle-master',
  templateUrl: './create-vehicle-master.component.html',
  styleUrls: ['./create-vehicle-master.component.css']
})
export class CreateVehicleMasterComponent implements OnInit {

  vehicleMaster: VehicleMaster = new VehicleMaster();
  error: boolean;
  success: boolean;
  form: FormGroup;
  message: string;

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.vehicleMaster = new VehicleMaster();
    this.message = "";

  }

  reactiveForm() {
    this.form = this.fb.group({
      number: ['', Validators.required],
      chasis: [''],
      engine: [''],
      vehicleType: ['', Validators.required],
      make: ['', Validators.required]
    });

  }

  save() {
    this.vehicleMasterService.createVehicleMaster(this.vehicleMaster)
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
    this.vehicleMaster = new VehicleMaster();

  }

  onSubmit() {
    if (this.form.valid) {
      this.vehicleMaster = this.form.value as VehicleMaster;
      this.save();
    }

  }

  gotoList() {
    this.router.navigate(['/vehicle-master']);
  }
}
