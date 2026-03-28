import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from './layout/main-header/main-header';
import { Footer } from './layout/footer/footer';
import { MainContent } from './layout/main-content/main-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeader,Footer, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
