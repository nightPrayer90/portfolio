import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-skills',
  imports: [TranslatePipe],
  templateUrl: './my-skills.html',
  styleUrl: './my-skills.scss',
})
export class MySkills {}
