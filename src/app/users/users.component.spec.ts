import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UsersComponent } from './users.component';
import { UserService } from '../user.service';
import { FakeUserService } from '@testing/fake-user.service';
import { MatDialogModule } from '@angular/material';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
      ],
      declarations: [ UsersComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: UserService, useClass: FakeUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
