import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  userform = new FormGroup({
    yourName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\p{L}\-'.]{2,}\s+[\p{L}\s\-'.]+$/u),
    ]),
    yourMessage: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    yourEmail: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g),
      ],
    }),
    privacyPolicy: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

  /**
   * Handles form submission.
   *
   * - If the form is valid:
   *   - Logs the form values
   *   - Resets the form state
   *
   * - If the form is invalid:
   *   - Marks all fields as touched to trigger validation UI
   *   - Updates input placeholders with error messages
   */
  formSubmit(): void {
    if (this.userform.valid) {
      console.log(this.userform.value);
      this.formReset();
    } else {
      this.userform.markAllAsTouched();
    }
  }

  /**
   * Resets the form to its initial state.
   * - Removes touched state from controls
   * - Restores default placeholders
   * - Clears all input values
   */
  formReset(): void {
    this.userform.reset();
  }

  getNameError(): string {
    const field = this.userform.get('yourName');
    if (field?.hasError('pattern')) {
      return "Please enter first and last name";
    }
    if (field?.hasError('pattern')) {
      return "No special characters allowed";
    }
    return "";
  }

  getEmailError(): string {
    const field = this.userform.get('yourEmail');
    if  (field?.hasError('email') || field?.hasError('pattern')) {
      return "Please enter a valid email address";
    }
    return "";
  }

  getMessageError(): string {
  if (this.userform.get('yourMessage')?.hasError('minlength')) {
    return "That's a bit short, tell me more!";
  }
  return "";
}
}
