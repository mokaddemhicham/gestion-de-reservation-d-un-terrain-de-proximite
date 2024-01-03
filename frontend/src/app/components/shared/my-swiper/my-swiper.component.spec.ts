import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySwiperComponent } from './my-swiper.component';

describe('MySwiperComponent', () => {
  let component: MySwiperComponent;
  let fixture: ComponentFixture<MySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySwiperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
