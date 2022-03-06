import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../services/app-services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  registrationForm = this.fb.group({
    id:[''],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
    lastName: ['', [Validators.required]],
    // }),
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    street: ['', [Validators.required]],
    address: this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })

  })

  submitted = false;

  // City names
  City: any = [];
  Countries: any = [];
  States: any = [];

  constructor(public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private rest: Service,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    if (Object.keys(this.data).length > 0) {
      this.registrationForm.setValue(this.data);
      // this.registrationForm.controls.value
    }

  }

  ngOnInit(): void {
    this.rest.getCountries().subscribe(res => {
      this.Countries = res;
      this.changeCountry();
      setTimeout(() => {
        this.changeState()
      }, 500)
    })

  }
  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }
  get addressForm() {
    return this.myForm.address['controls'];
  }

  // Choose city using select dropdown
  changeState() {
    this.rest.getCity(this.addressForm.state.value).subscribe(cities => {
      this.City = cities
    })
  }

  changeCountry() {
    this.rest.getState(this.addressForm.country.value).subscribe(states => {
      this.States = states
    })
    this.City = [];
  }
  changeCity() {

  }
  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.registrationForm.get('addDynamicElement') as FormArray
  }

  // addSuperPowers() {
  //   this.addDynamicElement.push(this.fb.control(''))
  // }

  // Submit Registration Form
  onSubmit() {
    this.submitted = true;

    if (!this.registrationForm.valid) {
      alert('Please fill all the required fields')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.dialogRef.close(this.registrationForm.value);
    }
  }

}
