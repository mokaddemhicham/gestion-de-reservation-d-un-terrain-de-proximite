import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainsComponent } from './terrains.component';

describe('TerrainsComponent', () => {
  let component: TerrainsComponent;
  let fixture: ComponentFixture<TerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
