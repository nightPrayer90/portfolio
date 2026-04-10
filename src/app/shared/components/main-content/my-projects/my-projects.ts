import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  imports: [TranslatePipe],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss',
})
export class MyProjects {
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
