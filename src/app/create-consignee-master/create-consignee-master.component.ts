import { ConsigneeMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsigneeMasterService } from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-vehicle-master',
  templateUrl: './create-consignee-master.component.html',
  styleUrls: ['./create-consignee-master.component.css']
})
export class CreateConsigneeMasterComponent implements OnInit {

  consigneeMaster: ConsigneeMaster = new ConsigneeMaster();
  error: boolean;
  success: boolean;
  form: FormGroup;
  message: string;

  constructor(
    private consigneeMasterService: ConsigneeMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.consigneeMaster = new ConsigneeMaster();
    this.message = "";

  }

  reactiveForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      gst: [''],
      pan: ['', ]
    });

  }

  save() {
    this.consigneeMasterService.createConsigneeMaster(this.consigneeMaster)
      .subscribe(
        data => {
          this.error = false;
          this.success = true;
          this.message = "Master Created Successfully!";

        },
        error => {
          this.error = true;
          this.success = false;
          this.message = error;
          this.error = true;
        });
    this.consigneeMaster = new ConsigneeMaster();

  }

  onSubmit() {
    if (this.form.valid) {
      this.consigneeMaster = this.form.value as ConsigneeMaster;
      this.save();
    }

  }

  gotoList() {
    this.router.navigate(['/consignee-master']);
  }
}
