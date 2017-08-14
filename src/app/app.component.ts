import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private users: User[] = [];
  private selectedUser:User = new User;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private userService: UserService) { 
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('../assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  public ngOnInit() {
    this.userService.getUsers().subscribe(
      users => { 
        this.users = users;
        this.selectedUser = this.users[0];
      }
    );
  }
}
