import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScorersComponent } from './high-scorers.component';

describe('HighScorersComponent', () => {
  let component: HighScorersComponent;
  let fixture: ComponentFixture<HighScorersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighScorersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighScorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
