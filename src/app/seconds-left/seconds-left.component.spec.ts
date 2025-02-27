import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsLeftComponent } from './seconds-left.component';

describe('SecondsLeftComponent', () => {
  let component: SecondsLeftComponent;
  let fixture: ComponentFixture<SecondsLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondsLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
