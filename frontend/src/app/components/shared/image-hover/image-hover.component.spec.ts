import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHoverComponent } from './image-hover.component';

describe('ImageHoverComponent', () => {
  let component: ImageHoverComponent;
  let fixture: ComponentFixture<ImageHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageHoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
