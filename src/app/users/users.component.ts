import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  private selectedUser: User = new User;
  private name: string;
  private bs: string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private userService: UserService, private dialog: MatDialog) {
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.selectedUser = this.users[0];
      }
    );
  }

  public openAdminDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .subscribe(user => {
        if (!user.name || !user.bs) {
          return;
        }

        this.users.push({
          id: this.users.length + 1,
          name: user.name,
          bs: user.bs,
          avatar: 'svg-6'
        });
        this.selectedUser = user;
        this.userService.addUser(user).subscribe();
      });
  }

}
