import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTerrainComponent } from './card-terrain.component';

describe('CardTerrainComponent', () => {
  let component: CardTerrainComponent;
  let fixture: ComponentFixture<CardTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTerrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
