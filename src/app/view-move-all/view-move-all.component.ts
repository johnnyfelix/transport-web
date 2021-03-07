import {MovementAllService} from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Movementall} from '@app/_models/movementall';

@Component({
  selector: "app-view-move-all",
  templateUrl: "./view-move-all.component.html",
  styleUrls: ["./view-move-all.component.css"]
})
export class ViewMoveAllComponent implements OnInit {

  moveallList: Movementall[] = [];
  myForm: FormGroup;
  dataSource = new MatTableDataSource(this.moveallList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['serial', 'movementId', 'category', 'transportDate', 'movementType', 'vehicleType', 'size',
    'containerNumber', 'fromLocation', 'toLocation', 'via', 'cargoWeight','blNumber', 'pickupPoint','pickup_date',
    'deliveryDate','timeIn', 'timeOut', 'emptyIn', 'boeNo', 'consigneeNameAddress', 'contractType', 'poShipmentNo',
  'noOfPackages','sealNo', 'advance','diesel','incentive','cashSundaries','lrNumber', 'weight', 'vehicleNumber','doNumber',
    'doType', 'driverName', 'rate', 'otherExpenses', 'offloadReceipt','remark'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['SL NO', 'Category', 'Transport Date','Movement Type', 'Vehicle Type', 'Size','Container Number','From Location',
      'To Location', 'Via', 'Cargo Weight','BL Number','Pickup Point','Pickup Date','Delivery Date','Time In','Time Out',
      'Empty In','BOE No','Consignee Name Address','Contract Type','Po Shipment No','No Of Packages','Seal No', 'Advance',
      'Diesel','Incentive', 'Cash Sundries','LR Number', 'Weight', 'Vehicle Number','DO Number', 'DO Type', 'Driver Name',
      'Rate', 'Other Expenses','Offload Receipt', 'Remark']
  };

  constructor(private moveAllService: MovementAllService,
              private router: Router,
              public dialog: MatDialog,
              private fb: FormBuilder,) {}

  ngOnInit() {
    this.loadData();
    this.myForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  loadData(){
    this.moveAllService.getAllMovements().subscribe(
      data => {
        this.moveallList = data;
        this.dataSource = new MatTableDataSource(this.moveallList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  date1(e) {
    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('fromDate').setValue(convertDate, {
      onlyself: true
    })
  }

  date2(e) {
    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('toDate').setValue(convertDate, {
      onlyself: true
    })
  }

  displayDate(value){
    return formatDate(new Date(value), 'dd-MMM-yyyy', 'en_GB');
  }

  resetData(){
    this.myForm.reset();
    this.loadData();
  }

  filterData(){
    var fromDate = this.myForm.get('fromDate').value;
    var toDate = this.myForm.get('toDate').value;
    this.moveAllService.filterMoveCfs(fromDate, toDate).subscribe(
      data => {
        this.moveallList = data;
        this.dataSource = new MatTableDataSource(this.moveallList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  addSLNotoList(){
    let i = 1;
    var moveallArray: Array<Movementall> =[];
    for (var moveall of this.moveallList) {
      moveall.movementId = i++;
      if(moveall.driverName == null)
        moveall.driverName = "";
      moveallArray.push(moveall);
    }
    return moveallArray;
  }

  exportCsv(){
    new Angular5Csv(this.addSLNotoList(),'Movements_All_Report', this.options);
  }

}

