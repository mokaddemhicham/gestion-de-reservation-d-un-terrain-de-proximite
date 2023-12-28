import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTerrainsComponent } from './list-terrains.component';

describe('ListTerrainsComponent', () => {
  let component: ListTerrainsComponent;
  let fixture: ComponentFixture<ListTerrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTerrainsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
