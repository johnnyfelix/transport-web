import {ConsigneeMaster, DriverMaster, Movefactory, VehicleMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminMasterService, ConsigneeMasterService, MoveFactoryService, VehicleMasterService, DriverMasterService} from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {RequireMatch} from '@app/requireMatch';

@Component({
  selector: 'app-create-move-factory',
  templateUrl: './create-move-factory.component.html',
  styleUrls: ['./create-move-factory.component.css']
})
export class CreateMoveFactoryComponent implements OnInit {

  movecfs: Movefactory;
  error: boolean;
  success: boolean;
  myForm: FormGroup;
  control: FormControl;
  message: string;
  filteredVehicles: Observable<VehicleMaster[]>;
  filteredConsignee: Observable<ConsigneeMaster[]>;
  selecteVehicle:string;
  selectedDriver:string;
  filteredDrivers: Observable<DriverMaster[]>;
  selecteConsignee:string;
  masterMovementType: Observable<string[]>;
  masterVehicleType: Observable<string[]>;
  masterPort: Observable<string[]>;
  masterCFS: Observable<string[]>;


  constructor(
    private movecfsService: MoveFactoryService,
    private vehicleService: VehicleMasterService,
    private driverService: DriverMasterService,
    private adminService: AdminMasterService,
    private consigneeService: ConsigneeMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.filteredVehicles = this.myForm.get('vehicleNumber').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.vehicleService.searchVehicleMaster(value))
      );
    this.filteredDrivers = this.myForm.get('driverName').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.driverService.searchDriverMaster(value))
      );
    this.filteredConsignee = this.myForm.get('consigneeNameAddress').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.consigneeService.searchConsigneeMaster(value))
      );

    this.masterVehicleType = this.myForm.get('vehicleType').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.adminService.searchVehicleTypes(value))
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

  displayFn(vehicleMaster: VehicleMaster) {
    if (vehicleMaster) { return vehicleMaster.number; }
  }

  displayWith(consignee: ConsigneeMaster) {
    if (consignee) { return consignee.name+";"+consignee.address; }
  }

  driverSelected(event) {
    this.selectedDriver = event.option.value.name;
  }
  displayDrFn(driverMaster: DriverMaster) {
    if (driverMaster) { return driverMaster.name; }
  }

  vehicleSelected(event) {
    this.selecteVehicle = event.option.value.number;
  }

  consigneeSelected(event) {
    this.selecteConsignee = event.option.value.name+";"+event.option.value.address;
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      transportDate: ['', [Validators.required]],
      movementType: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      size: [''],
      containerNumber: ['', [Validators.required]],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      cargoWeight: ['', [Validators.required]],
      blNumber: [''],
      pickupPoint: [''],
      pickup_date: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      timeIn: [''],
      timeOut: [''],
      emptyIn: [''],
      boeNo: [''],
      consigneeNameAddress: ['', [RequireMatch]],
      contractType: [''],
      poShipmentNo: [''],
      noOfPackages: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      sealNo: [''],
      advance: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      diesel: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      incentive: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      cashSundaries: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      rate: ['', [Validators.required, Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      lrNumber: [''],
      vehicleNumber: ['', [RequireMatch]],
      driverName: ['', [RequireMatch]],
      doNumber: [''],
      remark: [''],
      otherExpenses: ['']
    })
  }

  date1(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('transportDate').setValue(convertDate, {
      onlyself: true
    })
  }

  date2(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('transportDate').setValue(convertDate, {
      onlyself: true
    })
  }

  date3(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('deliveryDate').setValue(convertDate, {
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
      this.movecfs = this.myForm.value as Movefactory;
      this.movecfs.vehicleNumber = this.selecteVehicle;
      this.movecfs.consigneeNameAddress = this.selecteConsignee;
      this.movecfs.driverName = this.selectedDriver;
      this.save();
    }
  }

  save() {
    this.movecfsService.createMoveFactory(this.movecfs).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Movement Created Successfully!"
        this.myForm.reset();
      },
      error => {
        console.log(error);
        this.message = error;
        this.error = true;
      });
  }

}
