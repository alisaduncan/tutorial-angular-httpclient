import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { UserService } from './user.service';
import { User } from './user';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public users: User[] = [];
  private selectedUser: User = new User;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private userService: UserService, private dialog: MatDialog) {
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
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

  public openAdminDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .map(result => {
        result.id = this.users.length + 1;
        result.avatar = 'svg-6';
        return result;
      })
      .subscribe(user => {
        this.users.push(user);
        this.selectedUser = user;
        this.userService.addUser(user).subscribe();
      });
  }
}
