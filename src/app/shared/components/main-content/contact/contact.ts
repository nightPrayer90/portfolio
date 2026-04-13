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
    yourName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    yourMessage: new FormControl('', {validators: [Validators.required, Validators.minLength(5)] }),
    yourEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
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
      this.updateInputPlaceholders("Your name is required", "Your Email is required", "Your message is required");
    }
  }

  /**
 * Resets the form to its initial state.
 * - Removes touched state from controls
 * - Restores default placeholders
 * - Clears all input values
 */
  formReset(): void {
    this.userform.markAsUntouched();
    this.updateInputPlaceholders("Your Name", "Your Email", "Your Message")
    this.userform.reset();
  }

  /**
 * Updates the placeholder text of input fields based on validation state.
 * Only updates placeholders for fields that are currently invalid.
 * @param {string} nP - Placeholder text for the name input
 * @param {string} eP - Placeholder text for the email input
 * @param {string} mP - Placeholder text for the message textarea
 */
  updateInputPlaceholders(nP:string, eP: string, mP:string ): void {
    const nameInput = document.getElementById('yourName') as HTMLInputElement | null;
    const emailInput = document.getElementById('yourMail') as HTMLInputElement | null;
    const messageInput = document.getElementById('yourMessage') as HTMLTextAreaElement | null;

    if (nameInput && this.userform.get('yourName')?.invalid) {
      nameInput.placeholder = nP;
    }

    if (emailInput && this.userform.get('yourEmail')?.invalid) {
      emailInput.placeholder = eP;
    }

    if (messageInput && this.userform.get('yourMessage')?.invalid) {
      messageInput.placeholder = mP;
    }
  }
}
