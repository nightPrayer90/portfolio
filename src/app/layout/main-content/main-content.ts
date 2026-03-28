import { Component } from '@angular/core';
import { Hero } from '../../shared/components/hero/hero';
import { WhyMe } from '../../shared/components/why-me/why-me';
import { MySkills } from '../../shared/components/my-skills/my-skills';
import { MyProjects } from '../../shared/components/my-projects/my-projects';
import { Contact } from '../../shared/components/contact/contact';

@Component({
  selector: 'app-main-content',
  imports: [Hero, WhyMe, MySkills, MyProjects, Contact],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
