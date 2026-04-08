import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  userform = new FormGroup({
    yourName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    yourMessage: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] }),
    yourEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
  });

  // submit btn
  formSubmit() {
    console.log(this.userform.value);
    this.formReset();
  }

  formReset() {
    this.userform.markAsUntouched();
    this.userform.reset();
  }
}
