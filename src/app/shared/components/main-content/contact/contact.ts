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

  // submit btn
  formSubmit(): void {
    if (this.userform.valid) {
      console.log(this.userform.value);
      this.formReset();
    } else {
      this.userform.markAllAsTouched();
      this.updateInputPlaceholders("Your name is required", "Your Email is required", "Your message is required", true);
    }
  }

  formReset(): void {
    this.userform.markAsUntouched();
    this.updateInputPlaceholders("Your Name", "Your Email", "Your Message", false)
    this.userform.reset();
  }

  updateInputPlaceholders(nP:string, eP: string, mP:string, isAdd:boolean ): void {
    const nameInput = document.getElementById('yourName') as HTMLInputElement | null;
    const emailInput = document.getElementById('yourMail') as HTMLInputElement | null;
    const messageInput = document.getElementById('yourMessage') as HTMLTextAreaElement | null;

    if (nameInput && this.userform.get('yourName')?.invalid) {
      nameInput.placeholder = nP;
      // this.changeScssClass(isAdd, nameInput, "input-invalid");
      // this.changeScssClass(!isAdd, nameInput, "input-empty");
    }

    if (emailInput && this.userform.get('yourEmail')?.invalid) {
      emailInput.placeholder = eP;
      // this.changeScssClass(isAdd, emailInput, "input-invalid");
      // this.changeScssClass(!isAdd, emailInput, "input-empty");
    }

    if (messageInput && this.userform.get('yourMessage')?.invalid) {
      messageInput.placeholder = mP;
      // this.changeScssClass(isAdd, messageInput, "input-invalid");
      // this.changeScssClass(!isAdd, messageInput, "input-empty");
    }
  }

  // changeScssClass(isAdd:boolean, elemet:HTMLElement, className:string) {
  //   if (isAdd) elemet.classList.add(className);
  //   else elemet.classList.remove(className);
  // }
}
