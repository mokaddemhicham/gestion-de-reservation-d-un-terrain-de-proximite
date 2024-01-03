import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryNavComponent } from './try-nav.component';

describe('TryNavComponent', () => {
  let component: TryNavComponent;
  let fixture: ComponentFixture<TryNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
