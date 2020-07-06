import { MoveEmptyService } from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {Moveempty} from '@app/_models';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: "app-view-move-empty",
  templateUrl: "./view-move-empty.component.html",
  styleUrls: ["./view-move-empty.component.css"]
})
export class ViewMoveEmptyComponent implements OnInit {

  movecfsList: Moveempty[] = [];
  myForm: FormGroup;
  dataSource = new MatTableDataSource(this.movecfsList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['transportDate', 'movementType', 'size', 'containerNumber',
  'fromLocation', 'toLocation', 'via', 'advance', 'diesel', 'incentive', 'cashSundaries',
    'lrNumber', 'vehicleNumber', 'doNumber', 'doType','offloadReceipt', 'action'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['ID', 'Transport Date', 'Movement Type', 'Size', 'Container Number',
      'From Location', 'To Location', 'Via', 'Advance', 'Diesel', 'Incentive', 'Cash Sundaries',
      'LR Number', 'Vehicle Number', 'Do Number', 'Do Type', 'Offload Receipt']
  };

  constructor(private movecfsService: MoveEmptyService,
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
    this.movecfsService.getAllMoveEmpty().subscribe(
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
    return formatDate(new Date(value), 'dd-MMM-yyyy', 'en_UK');
  }

  resetData(){
    this.myForm.reset();
    this.loadData();
  }

  filterData(){
    var fromDate = this.myForm.get('fromDate').value;
    var toDate = this.myForm.get('toDate').value;
    this.movecfsService.filterMoveEmpty(fromDate, toDate).subscribe(
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
    new Angular5Csv(this.movecfsList,'Movement_Empty_Report', this.options);
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
    this.movecfsService.deleteMoveEmpty(row_obj.movementEmptyId).subscribe(
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

