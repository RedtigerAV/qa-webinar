import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('file', {static: false}) file: ElementRef;
  @ViewChild('bik', {static: false}) bik: ElementRef;
  form: FormGroup;
  showFile = true;
  showAllRequiredError = false;
  showINNError = false;
  showBIKError = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fio: [''],
      birthday_city: [''],
      photo: [''],
      birthday: [''],
      index: [''],
      city: [''],
      street: [''],
      address: [''],
      bank: [''],
      bik: [''],
      cor_bill: [''],
      inn: [''],
      kpp: ['']
    });

    this.form.controls.photo.valueChanges.subscribe(value => {
      if (value) {
        this.showFile = false;
      }
    });
  }

  public submit(): void {
    const allFieldsFilled = Object.keys(this.form.controls).every(key => !!this.form.get(key).value);

    if (!allFieldsFilled) {
      this.form.reset();
      this.showAllRequiredError = true;
      this.showFile = true;

      return;
    } else {
      this.showAllRequiredError = false;
    }

    if ((this.form.get('inn').value).toString().length !== 12) {
      this.form.get('inn').reset();
      this.showINNError = true;

      return;
    } else {
      this.showINNError = false;
    }

    if (this.bik.nativeElement.value.length !== 9 || !this.bik.nativeElement.value.startsWith('04')) {
      this.form.get('bik').reset();
      this.showBIKError = true;

      return;
    } else {
      this.showBIKError = false;
    }
  }
}
