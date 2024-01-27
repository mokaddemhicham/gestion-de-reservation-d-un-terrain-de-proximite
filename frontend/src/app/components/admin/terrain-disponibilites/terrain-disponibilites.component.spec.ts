import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainDisponibilitesComponent } from './terrain-disponibilites.component';

describe('TerrainDisponibilitesComponent', () => {
  let component: TerrainDisponibilitesComponent;
  let fixture: ComponentFixture<TerrainDisponibilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainDisponibilitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
