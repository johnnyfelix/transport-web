import {CashVoucher} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CashVoucherService} from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-create-cash-voucher',
  templateUrl: './create-cash-voucher.component.html',
  styleUrls: ['./create-cash-voucher.component.css']
})
export class CreateCashVoucherComponent implements OnInit {

  cashVoucher: CashVoucher;
  error: boolean;
  success: boolean;
  message: string;
  myForm: FormGroup;
  control = new FormControl();


  constructor(
    private cashVoucherService: CashVoucherService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.message = "";
   }

  inputChanged(control: string,event){
    const selection: any = event.target.value;
    if (typeof selection === 'string') {
      this.myForm.controls[control].setErrors({ incorrect: true });
    }
    return null;
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      voucherDate: ['', [Validators.required]],
      paid: ['', [Validators.required]],
      paidTo: [''],
      voucherNo: ['', [Validators.required]],
      approvedBy: [''],
      amount: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      balanceReceived: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]]
    })
  }

  date(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('voucherDate').setValue(convertDate, {
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
      this.cashVoucher = this.myForm.value as CashVoucher;
      this.save();
    }
  }

  save() {
    this.cashVoucherService.createCashVoucher(this.cashVoucher).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Cash Voucher Created Successfully!"
        this.myForm.reset();
      },
      error => {
        console.log(error);
        this.message = error;
        this.error = true;
      });
  }

}
