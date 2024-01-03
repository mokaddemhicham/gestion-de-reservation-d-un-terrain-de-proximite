import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HichamNavComponent } from './hicham-nav.component';

describe('HichamNavComponent', () => {
  let component: HichamNavComponent;
  let fixture: ComponentFixture<HichamNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HichamNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HichamNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
