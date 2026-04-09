import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-header',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  private translate = inject(TranslateService);

  currentLang: string | null = '';

  ngOnInit(): void {
    this.currentLang = this.translate.getCurrentLang() || this.translate.getFallbackLang();
  }

  switchLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  getLangClass(lang: string): string {
    return this.currentLang === lang ? 'language-container__button--active' : '';
  }
}
