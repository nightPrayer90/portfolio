import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-header',
  imports: [TranslatePipe, CommonModule, RouterLink],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  private translate = inject(TranslateService);
  currentLang: string = '';
  menuOpen: boolean = false;

  /**
   * Initializes the component language on startup.
   *
   * Priority:
   * 1. Language stored in localStorage
   * 2. Currently active language from translate service
   * 3. Fallback language or default ("de")
   */
  ngOnInit(): void {
    const savedLang = localStorage.getItem('port_lang');

    if (savedLang) {
      this.currentLang = savedLang;
    } else if (this.translate.getCurrentLang()) {
      this.currentLang = this.translate.getCurrentLang();
    } else {
      this.currentLang = this.translate.getFallbackLang() || 'de';
    }
    this.translate.use(this.currentLang);
  }

  /**
   * Switches the current application language.
   * Also persists the selected language in localStorage.
   * Closes the burger menu if it is currently open.
   * @param {string} language - The language code to switch to (e.g. "en", "de")
   */
  switchLang(language: string): void {
    this.currentLang = language;
    this.translate.use(language);
    localStorage.setItem('port_lang', language);

    if (this.menuOpen) {
      this.closeBurgerMenu();
    }
  }

  /**
   * Returns the CSS class for a language button based on active state.
   * @param {string} language - The language code to check
   * @returns {string} CSS class for active state or empty string
   */
  getLangClass(language: string): string {
    return this.currentLang === language ? 'language-container__button--active' : '';
  }

  /**
   * Toggles the burger menu open/closed state.
   * Also updates the body overflow to prevent/allow scrolling.
   */
  toggleBurgerMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.toggleOverflow(this.menuOpen);
  }

  /**
   * Closes the burger menu and restores body scrolling.
   */
  closeBurgerMenu(): void {
    this.menuOpen = false;
    this.toggleOverflow(this.menuOpen);
  }

  /**
   * Enables or disables page scrolling by modifying body overflow.
   * @param {boolean} ishidden - If true, disables scrolling; otherwise restores it
   */
  toggleOverflow(ishidden: boolean): void {
    if (ishidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
