import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CashVoucherService, PrintService} from '@app/_services';
import {CashVoucher} from '@app/_models';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-print-cash-voucher',
  templateUrl: './print-cash-voucher.component.html',
  styleUrls: ['./print-cash-voucher.component.css']
})
export class PrintCashVoucherComponent implements OnInit {

  id: number;
  cashVoucher: CashVoucher;

  constructor(private cashVoucherService: CashVoucherService,
              private printService: PrintService,
              private route: ActivatedRoute) {
  }

  displayDate(value){
    return formatDate(new Date(value), 'dd-MMM-yyyy', 'en_UK');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cashVoucher = new CashVoucher();
    this.loadData();
  }

  loadData(){
    this.cashVoucherService.getCashVoucher(this.id).subscribe(data => {
      console.log(data)
      this.cashVoucher = data;
      this.printService.onDataReady();
    }, error => console.log(error.message));
  }
}
