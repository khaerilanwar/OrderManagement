import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvcAppComponent } from './mvc-app.component';

describe('MvcAppComponent', () => {
  let component: MvcAppComponent;
  let fixture: ComponentFixture<MvcAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MvcAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvcAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
