import {Movecfs, VehicleMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminMasterService, MovecfsService, VehicleMasterService} from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Observable} from 'rxjs';
import {debounceTime,switchMap} from 'rxjs/operators';
import { RequireMatch as RequireMatch } from '../requireMatch'

@Component({
  selector: 'app-create-move-cfs',
  templateUrl: './create-move-cfs.component.html',
  styleUrls: ['./create-move-cfs.component.css']
})
export class CreateMoveCfsComponent implements OnInit {

  movecfs: Movecfs;
  error: boolean;
  success: boolean;
  message: string;
  myForm: FormGroup;
  control = new FormControl();
  selectedVehicle:string;
  filteredVehicles: Observable<VehicleMaster[]>;
  masterMovementType: Observable<string[]>;
  masterPort: Observable<string[]>;
  masterCFS: Observable<string[]>;


  constructor(
    private movecfsService: MovecfsService,
    private vehicleService: VehicleMasterService,
    private adminService: AdminMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.message = "";
    this.filteredVehicles = this.myForm.get('vehicleNumber').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.vehicleService.searchVehicleMaster(value))
      );
    this.masterMovementType = this.myForm.get('movementType').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchMovementTypes(value))
      );
    this.masterPort = this.myForm.get('fromLocation').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchPORT(value))
      );
    this.masterCFS = this.myForm.get('toLocation').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchCFS(value))
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
    this.selectedVehicle = event.option.value.number;
  }

  displayFn(vehicleMaster: VehicleMaster) {
    if (vehicleMaster) { return vehicleMaster.number; }
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
      cashSundries: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      weight: [''],
      lrNumber: ['', [Validators.required]],
      vehicleNumber: ['', [RequireMatch]],
      doNumber: ['', [Validators.required]],
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
      this.movecfs = this.myForm.value as Movecfs;
      this.movecfs.vehicleNumber = this.selectedVehicle;
      this.save();
    }
  }

  save() {
    this.movecfsService.createMoveCfs(this.movecfs).subscribe(
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
