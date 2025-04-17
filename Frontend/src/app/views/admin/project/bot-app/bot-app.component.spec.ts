import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAppComponent } from './bot-app.component';

describe('BotAppComponent', () => {
  let component: BotAppComponent;
  let fixture: ComponentFixture<BotAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
