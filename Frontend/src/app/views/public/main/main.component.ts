import { Component } from '@angular/core';
import { HeroWidget } from '../../../layout/landing/components/herowidget';

@Component({
  selector: 'app-main',
  imports: [HeroWidget],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
