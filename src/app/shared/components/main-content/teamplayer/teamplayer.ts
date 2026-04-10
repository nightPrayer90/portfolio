import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-teamplayer',
  imports: [TranslatePipe],
  templateUrl: './teamplayer.html',
  styleUrl: './teamplayer.scss',
})
export class Teamplayer {}
