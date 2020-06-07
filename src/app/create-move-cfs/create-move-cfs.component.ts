import { Movecfs } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovecfsService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-move-cfs',
  templateUrl: './create-move-cfs.component.html',
  styleUrls: ['./create-move-cfs.component.css']
})
export class CreateMoveCfsComponent implements OnInit {

  movecfs: Movecfs;
  error: boolean;
  success: boolean;
  myForm: FormGroup;
  control: FormControl;
  message: string;

  constructor(
    private movecfsService: MovecfsService,
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
      advance: [''],
      diesel: [''],
      incentive: [''],
      cashSundries: [''],
      weight: [''],
      lrNumber: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      doNumber: ['', [Validators.required]],
    })
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('transportDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    this.success = false;
    this.error = false;
    this.message = "";
    this.movecfs = this.myForm.value as Movecfs;
    console.log("fromLocation "+this.movecfs.fromLocation);
    console.log("transportDate "+this.movecfs.transportDate);
    this.save();

  }

  save() {
    this.movecfsService.createMoveCfs(this.movecfs).subscribe(
      data => {
        console.log(data);
        this.success = true;
        this.message = "Movement Created Successfully!"
      },
      error => {
        console.log(error);
        this.message = error.error.error;
        this.error = true;
      });
  }

}
