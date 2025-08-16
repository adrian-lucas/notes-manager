import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePanelComponent } from './note-panel.component';

describe('NotePanelComponent', () => {
  let component: NotePanelComponent;
  let fixture: ComponentFixture<NotePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
