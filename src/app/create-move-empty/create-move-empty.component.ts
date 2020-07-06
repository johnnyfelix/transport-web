import { Moveempty } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoveEmptyService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-create-move-cfs',
  templateUrl: './create-move-empty.component.html',
  styleUrls: ['./create-move-empty.component.css']
})
export class CreateMoveEmptyComponent implements OnInit {

  movecfs: Moveempty;
  error: boolean;
  success: boolean;
  myForm: FormGroup;
  control: FormControl;
  message: string;

  constructor(
    private movecfsService: MoveEmptyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;

   }

  reactiveForm() {
    this.myForm = this.fb.group({
      transportDate: ['', [Validators.required]],
      movementType: ['', [Validators.required]],
      size: [''],
      containerNumber: ['', [Validators.required]],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      via: [''],
      advance: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      diesel: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      incentive: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      cashSundries: ['', [Validators.pattern('^[-]?[0-9]*[.]?[0-9]{0,2}$')]],
      lrNumber: [''],
      vehicleNumber: ['', [Validators.required]],
      doNumber: [''],
      doType: [''],
      offloadReceipt: ['']
    })
  }

  date(e) {

    let convertDate = formatDate(new Date(e.target.value), 'yyyy-MM-dd', 'en-GB')
    this.myForm.get('transportDate').setValue(convertDate, {
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
      this.movecfs = this.myForm.value as Moveempty;
      this.save();
    }
  }

  save() {
    this.movecfsService.createMoveEmpty(this.movecfs).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Movement Created Successfully!"
        this.myForm.reset();
      },
      error => {
        console.log(error);
        this.message = error.error.message;
        this.error = true;
      });
  }

}
