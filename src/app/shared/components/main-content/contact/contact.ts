import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private http = inject(HttpClient);
  private mailUrl = './sendMail.php';
  isSent = signal(false);

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
        Validators.pattern(/^[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/),
      ],
    }),
    privacyPolicy: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

   /**
   * Handles form submission.
   *
   * - If the form is invalid:
   *   - Marks all fields as touched to show validation messages
   *
   * - If the form is valid:
   *   - Sends name, email and message to sendMail.php
   *   - On success, resets the form and shows the "sent" state on the button for 5 seconds
   */
  formSubmit(): void {
    if (this.userform.invalid) {
      this.userform.markAllAsTouched();
      return;
    }

    const body = {
      name: this.userform.value.yourName,
      email: this.userform.value.yourEmail,
      message: this.userform.value.yourMessage,
    };

    this.http.post(this.mailUrl, body).subscribe({
      next: () => {
        this.formReset();
        this.isSent.set(true);
        setTimeout(() => this.isSent.set(false), 5000);
      },
      error: (err) => {},
    });
  }

    /**
   * Resets the form to its initial state.
   * Clears all input values and removes the touched state,
   * so validation messages and icons are hidden again.
   */
  formReset(): void {
    this.userform.reset();
  }

  /**
   * Returns the translation key for the current name validation error.
   * Distinguishes between invalid characters and a missing last name,
   * since both are covered by the same pattern validator.
   * @returns {string} Translation key or empty string if there is no pattern error
   */
  getNameError(): string {
    const field = this.userform.get('yourName');
    if (!field?.hasError('pattern')) return '';

    const hasSpecialChars = /[^\p{L}\s\-'.]/u.test(field.value ?? '');
    if (hasSpecialChars) return 'CONTACT.nameChars';
    return 'CONTACT.nameFull';
  }

  /**
   * Returns the translation key for an invalid email address.
   * @returns {string} Translation key or empty string if the email is valid
   */
  getEmailError(): string {
    const field = this.userform.get('yourEmail');
    if (field?.hasError('email') || field?.hasError('pattern')) {
      return 'CONTACT.emailInvalid';
    }
    return '';
  }

   /**
   * Returns the translation key if the message is too short.
   * @returns {string} Translation key or empty string if the length is valid
   */
  getMessageError(): string {
    if (this.userform.get('yourMessage')?.hasError('minlength')) {
      return 'CONTACT.messageShort';
    }
    return '';
  }
}
