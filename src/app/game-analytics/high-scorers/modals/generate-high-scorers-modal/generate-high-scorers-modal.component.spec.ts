import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateHighScorersModalComponent } from './generate-high-scorers-modal.component';

describe('GenerateHighScorersModalComponent', () => {
  let component: GenerateHighScorersModalComponent;
  let fixture: ComponentFixture<GenerateHighScorersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateHighScorersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateHighScorersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
