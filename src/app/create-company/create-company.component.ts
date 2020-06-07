import { Company } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  company: Company = new Company();
  error: boolean;
  form: FormGroup;
  control: FormControl;
  message: string;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.company = new Company();
    this.control = this.fb.control("", Validators.required);
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.message = "";
  }

  save() {
    this.companyService.createCompany(this.company)
      .subscribe(
        data => {
          //console.log(data);
          this.gotoList();
        },
        error => {
          //console.log(error);
          this.message = error.error.error;
          this.error = true;
        });
    this.company = new Company();

  }

  onSubmit() {
    if (this.form.valid) {
      this.company.name = this.form.get('name').value;
      this.company.description = this.form.get('description').value;
      this.save();
    }

  }

  gotoList() {
    this.router.navigate(['/companies']);
  }
}
