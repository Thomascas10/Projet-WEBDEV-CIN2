import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTacheComponent } from './add-Tache.component';

describe('AddTacheComponent', () => {
  let component: AddTacheComponent;
  let fixture: ComponentFixture<AddTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
