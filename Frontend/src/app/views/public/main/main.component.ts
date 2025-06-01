import { Component } from '@angular/core';
import { HeroWidget } from '../../../layout/landing/components/herowidget';
import { FeaturesWidget } from '../../../layout/landing/components/featureswidget';
import { HighlightsWidget } from '../../../layout/landing/components/highlightswidget';
import { PricingWidget } from '../../../layout/landing/components/pricingwidget';
import { FooterWidget } from '../../../layout/landing/components/footerwidget';

@Component({
  selector: 'app-main',
  imports: [HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, FooterWidget],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
