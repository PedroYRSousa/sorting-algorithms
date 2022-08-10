import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsortComponent } from './viewsort.component';

describe('ViewsortComponent', () => {
  let component: ViewsortComponent;
  let fixture: ComponentFixture<ViewsortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
