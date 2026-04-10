import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-why-me',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './why-me.html',
  styleUrl: './why-me.scss',
})
export class WhyMe {}
