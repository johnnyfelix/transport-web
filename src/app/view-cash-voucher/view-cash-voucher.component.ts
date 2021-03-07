import {CashVoucher} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CashVoucherService, PrintService} from '@app/_services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogBoxComponent} from '@app/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-view-cash-voucher',
  templateUrl: './view-cash-voucher.component.html',
  styleUrls: ['./view-cash-voucher.component.css']
})
export class ViewCashVoucherComponent implements OnInit {

  id: number;
  cashVoucher: CashVoucher;
  error: boolean;
  success: boolean;
  approved: boolean;
  message: string;
  myForm: FormGroup;


  constructor(
    private cashVoucherService: CashVoucherService,
    private printService: PrintService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cashVoucher = new CashVoucher();
    this.loadData();
    this.error = false;
    this.success = false;
    this.message = "";
    this.myForm = this.fb.group({
    });

   }

  loadData(){
    this.cashVoucherService.getCashVoucher(this.id).subscribe(data => {
      console.log(data)
      this.cashVoucher = data;
      var approvedStr = new String(this.cashVoucher.approvedBy);
      if(approvedStr.length > 0){
        this.approved = true
      }else {
        this.approved = false
      }
    }, error => console.log(error.message));
  }

  save() {
    this.cashVoucherService.createCashVoucher(this.cashVoucher).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Cash Voucher Created Successfully!"
      },
      error => {
        console.log(error);
        this.message = error;
        this.error = true;
      });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Delete') {
        this.deleteVoucher(result.data)
      }
    });


  }

  deleteVoucher(obj) {
    this.cashVoucherService.deleteCashVoucher(obj.id).subscribe(
      data => {
        this.gotoVoucherList();
      },
      error => {
        console.log(error);
        this.message = error;
        this.error = true;
      });
  }

  approveVoucher(obj) {
    this.cashVoucherService.approveCashVoucher(obj.id).subscribe(
      data => {
        this.success = true;
        this.message = "Cash Voucher Approved Successfully!"
        this.approved = true;
        this.loadData();
      },
      error => {
        console.log(error);
        this.message = error;
        this.error = true;
      });
  }

  printVoucher(obj) {
    this.printService
      .printDocument('print-cash-voucher', obj.id);
  }

  gotoVoucherList() {
    this.router.navigate(['/view-cash-vouchers']);
  }

}
