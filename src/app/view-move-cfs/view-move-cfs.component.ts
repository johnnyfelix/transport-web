import { MovecfsService } from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import {Movecfs} from '@app/_models';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "app-view-move-cfs",
  templateUrl: "./view-move-cfs.component.html",
  styleUrls: ["./view-move-cfs.component.css"]
})
export class ViewMoveCfsComponent implements OnInit {

  movecfsList: Movecfs[] = [];
  dataSource = new MatTableDataSource(this.movecfsList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['transportDate', 'movementType', 'size', 'containerNumber',
  'fromLocation', 'toLocation', 'via', 'advance', 'diesel', 'incentive', 'cashSundaries',
    'lrNumber', 'vehicleNumber', 'doNumber', 'weight'];


  constructor(private movecfsService: MovecfsService,
              private router: Router) {}

  ngOnInit() {
    this.loadData();
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


  exportCsv(){
    new Angular5Csv(this.movecfsList,'Test Report');
  }
}

