import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { DomSanitizer, By } from '@angular/platform-browser';

const iconRegistryStub = {
  addSvgIconSetInNamespace: function() {
    return;
  }
};

const userServiceStub = {
  getUsers: function() {
    return Observable.of([{
      id: 1,
      avatar: 'avatar',
      name: 'name',
      bs: 'jargon'
    }]);
  }
};

class MaterialDialogStub {
  open = jasmine.createSpy('open')
    .and.returnValue(new MaterialDialogStub);
  
  afterClosed = jasmine.createSpy('afterClosed')
    .and.returnValue( Observable.of({id: 1, avatar: 'test'}));
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        DomSanitizer,
        { provide: MdIconRegistry, useValue: iconRegistryStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: MdDialog, useValue: MaterialDialogStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should show a list of users', async(inject([UserService], (userServiceMock: UserService) => {
    component.ngOnInit();
    // component.users = [{
    //   id: 1,
    //   avatar: 'avatar',
    //   name: 'name',
    //   bs: 'jargon'
    // }];
    fixture.detectChanges;

    expect(fixture.debugElement.query(By.css('md-nav-list'))).toBeTruthy(); 
    
      userServiceMock.getUsers().subscribe(
        users => {
          //expect(component.users.length).toEqual(1);
          const el = fixture.debugElement.query(By.css('md-list-item'));  
          expect(el).toBeTruthy();
          expect(el.nativeElement.childNodes.length).toEqual(1);
        }
      );
    
    
  })));
});
