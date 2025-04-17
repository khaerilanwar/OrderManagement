import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstackAppComponent } from './fullstack-app.component';

describe('FullstackAppComponent', () => {
  let component: FullstackAppComponent;
  let fixture: ComponentFixture<FullstackAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullstackAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullstackAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
