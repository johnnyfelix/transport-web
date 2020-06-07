import { Company } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  id: number;
  saveDisabled: boolean;
  company: Company = new Company();
  submitted = false;
  form: FormGroup;
  control: FormControl;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.submitted = false;
    this.id = this.route.snapshot.params['id'];
    this.company = new Company();
    this.companyService.getCompany(this.id).subscribe(data => {
      console.log(data)
      this.company = data;
      this.saveDisabled = this.company.disabled;
    }, error => console.log(error));
    this.control = this.fb.control("", Validators.required);
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      saveDisabled: []
    });
  }

  public onSaveDisabled(value:boolean){
    this.saveDisabled = !value;
    console.log("Save disabled "+this.saveDisabled)
  }

  save() {
    this.company.disabled = this.saveDisabled;
    console.log("company disabled "+this.company.disabled)
    this.companyService.updateCompany(this.id,this.company)
      .subscribe(
        data => console.log(data),
        error => console.log(error));
    this.company = new Company();
    this.gotoList();
  }

  onSubmit() {
    if (this.form.valid) {
      this.company.name = this.form.get('name').value;
      this.company.description = this.form.get('description').value;
      this.save();
      this.submitted = true;
    }

  }

  gotoList() {
    this.router.navigate(['/companies']);
  }
}
