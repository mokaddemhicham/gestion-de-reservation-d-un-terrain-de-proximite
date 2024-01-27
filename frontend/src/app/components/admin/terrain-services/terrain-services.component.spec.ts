import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainServicesComponent } from './terrain-services.component';

describe('TerrainServicesComponent', () => {
  let component: TerrainServicesComponent;
  let fixture: ComponentFixture<TerrainServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
