import {DriverMaster, Moveempty, VehicleMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminMasterService, MoveEmptyService, VehicleMasterService, DriverMasterService} from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {RequireMatch} from '@app/requireMatch';

@Component({
  selector: 'app-create-move-cfs',
  templateUrl: './create-move-empty.component.html',
  styleUrls: ['./create-move-empty.component.css']
})
export class CreateMoveEmptyComponent implements OnInit {

  movecfs: Moveempty;
  error: boolean;
  success: boolean;
  myForm: FormGroup;
  control: FormControl;
  message: string;
  selecteVehicle:string;
  filteredmasters: Observable<VehicleMaster[]>;
  selectedDriver:string;
  filteredDrivers: Observable<DriverMaster[]>;
  masterMovementType: Observable<string[]>;
  masterPort: Observable<string[]>;
  masterCFS: Observable<string[]>;

  constructor(
    private movecfsService: MoveEmptyService,
    private vehicleService: VehicleMasterService,
    private driverService: DriverMasterService,
    private adminService: AdminMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.filteredmasters = this.myForm.get('vehicleNumber').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.vehicleService.searchVehicleMaster(value))
      );
    this.filteredDrivers = this.myForm.get('driverName').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.driverService.searchDriverMaster(value))
      );
    this.masterMovementType = this.myForm.get('movementType').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchMovementTypes(value))
      );
    this.masterPort = this.myForm.get('fromLocation').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchLocations(value))
      );
    this.masterCFS = this.myForm.get('toLocation').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchLocations(value))
      );


  }

  inputChanged(control: string,event){
    const selection: any = event.target.value;
    if (typeof selection === 'string') {
      this.myForm.controls[control].setErrors({ incorrect: true });
    }
    return null;
  }

  vehicleSelected(event) {
    this.selecteVehicle = event.option.value.number;
  }

  displayFn(vehicleMaster: VehicleMaster) {
    if (vehicleMaster) { return vehicleMaster.number; }
  }

  driverSelected(event) {
    this.selectedDriver = event.option.value.name;
  }
  displayDrFn(driverMaster: DriverMaster) {
    if (driverMaster) { return driverMaster.name; }
  }


  reactiveForm() {
    this.myForm = this.fb.group({
      transportDate: ['', [Validators.required]],
      movementType: ['', [Validators.required]],
      size: [''],
      containerNumber: ['', [Validators.required]],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      via: [''],
      advance: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      diesel: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      incentive: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      cashSundaries: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      rate: ['', [Validators.required, Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      lrNumber: [''],
      vehicleNumber: ['', [RequireMatch]],
      driverName: ['', [RequireMatch]],
      doNumber: [''],
      doType: [''],
      offloadReceipt: ['']
    })
  }

  date(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('transportDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    if (this.myForm.valid){
      this.success = false;
      this.error = false;
      this.message = "";
      this.movecfs = this.myForm.value as Moveempty;
      this.movecfs.vehicleNumber = this.selecteVehicle;
      this.movecfs.driverName = this.selectedDriver;
      this.save();
    }
  }

  save() {
    this.movecfsService.createMoveEmpty(this.movecfs).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Movement Created Successfully!"
        this.myForm.reset();
      },
      error => {
        console.log(error);
        this.message = error.error.message;
        this.error = true;
      });
  }

}
