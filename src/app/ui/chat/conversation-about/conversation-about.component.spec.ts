import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationAboutComponent } from './conversation-about.component';

describe('ConversationAboutComponent', () => {
  let component: ConversationAboutComponent;
  let fixture: ComponentFixture<ConversationAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
