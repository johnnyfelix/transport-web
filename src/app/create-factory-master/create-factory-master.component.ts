import { FactoryMaster} from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryMasterService } from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-factory-master',
  templateUrl: './create-factory-master.component.html',
  styleUrls: ['./create-factory-master.component.css']
})
export class CreateFactoryMasterComponent implements OnInit {

  factoryMaster: FactoryMaster;
  error: boolean;
  success: boolean;
  form: FormGroup;
  message: string;

  constructor(
    private factoryMasterService: FactoryMasterService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.reactiveForm();
    this.error = false;
    this.success = false;
    this.factoryMaster = new FactoryMaster();
    this.message = "";
  }

  reactiveForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      location: [''],
      kms: [''],
    });

  }

  save() {
    this.factoryMasterService.createFactoryMaster(this.factoryMaster)
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
    this.factoryMaster = new FactoryMaster();

  }

  onSubmit() {
    if (this.form.valid) {
      this.factoryMaster = this.form.value as FactoryMaster;
      this.save();
    }

  }

  gotoList() {
    this.router.navigate(['/factory-master']);
  }
}
