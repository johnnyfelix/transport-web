import { MovecfsService } from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {Movecfs} from '@app/_models';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "app-view-move-cfs",
  templateUrl: "./view-move-cfs.component.html",
  styleUrls: ["./view-move-cfs.component.css"]
})
export class ViewMoveCfsComponent implements OnInit {

  movecfsList: Movecfs[] = [];
  myForm: FormGroup;
  dataSource = new MatTableDataSource(this.movecfsList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['serial', 'movementPtcId', 'transportDate', 'movementType', 'size', 'containerNumber',
  'fromLocation', 'toLocation', 'via', 'advance', 'diesel', 'incentive', 'cashSundaries',
    'lrNumber', 'vehicleNumber', 'doNumber', 'weight'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['SL No', 'Transport Date', 'Movement Type', 'Size', 'Container Number',
      'From Location', 'To Location', 'Via', 'Advance', 'Diesel', 'Incentive', 'Cash Sundaries',
      'LR Number', 'Vehicle Number', 'Do Number', 'Weight']
  };

  constructor(private movecfsService: MovecfsService,
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
    this.movecfsService.getAllMoveCfs().subscribe(
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

  addSLNotoList(){
    let i = 1;
    var movecfsArray: Array<Movecfs> =[];
    for (var movecfs of this.movecfsList) {
      movecfs.movementPtcId = i++;
      movecfsArray.push(movecfs);
    }
    return movecfsArray;
  }

  filterData(){
    var fromDate = this.myForm.get('fromDate').value;
    var toDate = this.myForm.get('toDate').value;
    this.movecfsService.filterMoveCfs(fromDate, toDate).subscribe(
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
    new Angular5Csv(this.addSLNotoList(),'Movement_Port2CFS_Report', this.options);
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
    this.movecfsService.deleteMoveCfs(row_obj.movementPtcId).subscribe(
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

