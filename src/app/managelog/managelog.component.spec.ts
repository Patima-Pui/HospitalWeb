import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelogComponent } from './managelog.component';

describe('ManagelogComponent', () => {
  let component: ManagelogComponent;
  let fixture: ComponentFixture<ManagelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
