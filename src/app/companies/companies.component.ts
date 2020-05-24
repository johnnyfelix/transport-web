import { Observable } from "rxjs";
import { CompanyService } from '@app/_services';
import { Company } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"]
})
export class CompaniesComponent implements OnInit {
  companies: Observable<Company[]>;

  constructor(private companyService: CompanyService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.companies = this.companyService.getCompanies();
  }

  /*companyDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCompany(id: number){
    this.router.navigate(['update', id]);
  }*/
}
