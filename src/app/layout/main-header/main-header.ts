import { Component, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-header',
  imports: [TranslatePipe],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {

  private translate = inject(TranslateService);

  switchLang(lang: string): void {
    this.translate.use(lang);
  }
}