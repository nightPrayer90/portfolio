import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  imports: [TranslatePipe],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss',
})
export class MyProjects {
  /**
   * Opens the given URL in a new browser tab.
   * @param {string} url - The URL to open (live demo or GitHub repository)
   */
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
