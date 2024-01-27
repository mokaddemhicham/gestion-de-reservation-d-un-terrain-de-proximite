import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerrainComponent } from './add-terrain.component';

describe('AddTerrainComponent', () => {
  let component: AddTerrainComponent;
  let fixture: ComponentFixture<AddTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTerrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
