import { Company } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '@app/_services';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  company: Company = new Company();
  submitted = false;

  constructor(private companyService: CompanyService,
    private router: Router) { }

  ngOnInit() {
  }

  newCompany(): void {
    this.submitted = false;
    this.company = new Company();
  }

  save() {
    this.companyService.createCompany(this.company)
      .subscribe(data => console.log(data), error => console.log(error));
    this.company = new Company();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/company-list']);
  }
}
