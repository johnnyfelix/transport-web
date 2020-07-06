import {MoveFactoryService} from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {Movefactory} from '@app/_models';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: "app-view-move-factory",
  templateUrl: "./view-move-factory.component.html",
  styleUrls: ["./view-move-factory.component.css"]
})
export class ViewMoveFactoryComponent implements OnInit {

  movecfsList: Movefactory[] = [];
  myForm: FormGroup;
  dataSource = new MatTableDataSource(this.movecfsList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['transportDate', 'movementType', 'size', 'containerNumber',
  'fromLocation', 'toLocation', 'cargoWeight','pickupPoint','pickup_date',
    'deliveryDate','timeIn','emptyIn','advance', 'diesel','lrNumber',
    'vehicleNumber', 'doNumber', 'action'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['ID','Transport Date','Movement Type','Vehicle Type','Size','Container Number','From Location',
      'To Location','Cargo Weight','BL Number','Pickup Point','Pickup Date','Delivery Date','Time In',
      'Empty In','BOE No','Consignee Name Address','Contract Type','Po Shipment No','No Of Packages','Seal No','Advance',
      'Diesel','Incentive','Cash Sundaries','LR Number','Vehicle Number','DO Number','Remark','Other Expenses']
  };

  constructor(private moveFactoryService: MoveFactoryService,
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
    this.moveFactoryService.getAllMoveFactory().subscribe(
      data => {
        this.movecfsList = data;
        this.dataSource = new MatTableDataSource(this.movecfsList);
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
    this.moveFactoryService.filterMoveFactory(fromDate, toDate).subscribe(
      data => {
        this.movecfsList = data;
        this.dataSource = new MatTableDataSource(this.movecfsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  exportCsv(){
    new Angular5Csv(this.movecfsList,'Movement_PortCFS_TO_Factory_Report', this.options);
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      /*if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }*/
      this.deleteRowData(result.data);
    });


  }

  deleteRowData(row_obj){
    this.moveFactoryService.deleteMoveFactory(row_obj.movementPtfId).subscribe(
      data => {
        console.log("Deleted Success");
        this.loadData();
      },
      error => {
        console.log(error);
      }

    )
  }
}
