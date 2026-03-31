import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { MyProjects } from './my-projects/my-projects';
import { MySkills } from './my-skills/my-skills';
import { WhyMe } from './why-me/why-me';
import { Contact } from './contact/contact';


@Component({
  selector: 'app-main-content',
  imports: [Hero,MyProjects, MySkills, WhyMe,Contact],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
