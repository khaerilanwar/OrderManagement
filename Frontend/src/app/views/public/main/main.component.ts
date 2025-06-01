import { Component } from '@angular/core';
import { HeroWidget } from '../../../layout/landing/components/herowidget';
import { FooterWidget } from '../../../layout/landing/components/footerwidget';

@Component({
  selector: 'app-main',
  imports: [HeroWidget, FooterWidget],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
