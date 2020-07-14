import { User, Company } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService,CompanyService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User;
  currentCompany: string;
  companies: Company[];
  error: boolean;
  success: boolean;
  form: FormGroup;
  control: FormControl;
  message: string;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.success = false;
    this.user = new User();
    this.control = this.fb.control("", Validators.required);
    this.form = this.fb.group({
      new_username: ['', Validators.required],
      new_password: ['', Validators.required],
      company: []
    });
    this.message = "";
    this.loadCompanies();
    this.currentCompany = "";
  }

  setCurrentCompany(company: any){
    console.log("Selected Company "+company)
    this.currentCompany = company;
    this.message = ""
  }

  save() {
    this.userService.createUser(this.user)
      .subscribe(
        data => {
          //console.log(data);
          this.success = true;
          this.message = "User Created Successfully!"

        },
        error => {
          console.log(error);
          this.message = error.error.message;
          this.error = true;
        });


  }

  onSubmit() {
    this.success = false;
    this.message = ""
    if(this.currentCompany == ""){
      this.error = true;
      this.message = "Please select Company!"
    }
    if (this.form.valid && this.currentCompany != "") {
      this.error = false;
      this.user.password = this.form.get('new_password').value;
      this.user.username = this.form.get('new_username').value;
      this.user.company = this.currentCompany;
      this.save();
    }
  }

  gotoUsers() {
    this.router.navigate(['/users']);
  }

  loadCompanies(){
    this.companyService.getCompanies().subscribe(companyList => {
      this.companies = companyList as Company[];
    })
  }
}
