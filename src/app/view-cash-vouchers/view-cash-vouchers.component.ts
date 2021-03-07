import { CashVoucherService } from '@app/_services';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource,MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {CashVoucher, Moveempty} from '@app/_models';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: "app-view-cash-vouchers",
  templateUrl: "./view-cash-vouchers.component.html",
  styleUrls: ["./view-cash-vouchers.component.css"]
})
export class ViewCashVouchersComponent implements OnInit {

  cashVoucherList: CashVoucher[] = [];
  myForm: FormGroup;
  dataSource = new MatTableDataSource(this.cashVoucherList);

  @ViewChild(MatPaginator,{static: false}  ) paginator;
  @ViewChild(MatSort,{static: false}) sort;

  displayedColumns: string[] = ['serial', 'id', 'voucherDate', 'paid', 'paidTo', 'voucherNo',
  'approvedBy', 'amount', 'balanceReceived' ,'action'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['SL No', 'Voucher Date', 'Paid By', 'Paid To', 'Voucher Number',
      'Approved By', 'Amount', 'Balance Received']
  };

  constructor(private cashVoucherService: CashVoucherService,
              private router: Router,
              public dialog: MatDialog,
              private fb: FormBuilder,) {}

  ngOnInit() {
    this.loadData();
    this.myForm = this.fb.group({
      voucherDate: [''],
      voucherNumber: ['']
    });
  }

  loadData(){
    this.cashVoucherService.getAllCashVoucher().subscribe(
      data => {
        this.cashVoucherList = data;
        this.dataSource = new MatTableDataSource(this.cashVoucherList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  date(e) {
    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('voucherDate').setValue(convertDate, {
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
    var voucherDate = this.myForm.get('voucherDate').value;
    var voucherNumber = this.myForm.get('voucherNumber').value;
    if(voucherDate != null && voucherDate != undefined){
      this.cashVoucherService.filterCashVoucher(voucherDate).subscribe(
        data => {
          this.cashVoucherList = data;
          this.dataSource = new MatTableDataSource(this.cashVoucherList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
    }else if(voucherNumber != null && voucherNumber != ""){
      this.cashVoucherService.getCashVoucherByNumber(voucherNumber).subscribe(
        data => {
          this.cashVoucherList = data;
          this.dataSource = new MatTableDataSource(this.cashVoucherList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.resetData();
    }

  }

  addSLNotoList(){
    let i = 1;
    var cashVoucherArray: Array<CashVoucher> =[];
    for (var cashVoucher of this.cashVoucherList) {
      cashVoucher.id = i++;
      if(cashVoucher.balanceReceived == null)
        cashVoucher.balanceReceived = 0;
      cashVoucherArray.push(cashVoucher);
    }
    return cashVoucherArray;
  }

  exportCsv(){
    new Angular5Csv(this.addSLNotoList(),'Cash-Voucher', this.options);
  }

  openDialog(obj) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.data);
    });

  }


}

