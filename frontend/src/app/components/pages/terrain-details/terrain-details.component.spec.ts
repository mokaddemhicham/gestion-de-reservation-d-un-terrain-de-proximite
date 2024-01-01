import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainDetailsComponent } from './terrain-details.component';

describe('TerrainComponent', () => {
  let component: TerrainDetailsComponent;
  let fixture: ComponentFixture<TerrainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
