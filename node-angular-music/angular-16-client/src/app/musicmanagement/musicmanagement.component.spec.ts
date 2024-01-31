import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicManagementComponent } from './musicmanagement.component';

describe('ProductManagementComponent', () => {
  let component: MusicManagementComponent;
  let fixture: ComponentFixture<MusicManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
