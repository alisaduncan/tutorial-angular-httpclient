import { Observable, of } from 'rxjs';
import { User } from '../app/user';

export const FAKE_USERS: User[] = [
  {
    name: 'Test 1',
    bs: 'BS 1',
    id: 1,
    avatar: 'avatar-1'
  },
  {
    name: 'Test 2',
    bs: 'BS 2',
    id: 2
  },
];

export class FakeUserService {
  public apiEndpoint = 'api/';

  public getUsers(): Observable<User[]> {
    return of(FAKE_USERS);
  }

  public addUser(user: User): Observable<User> {
    return of({
      name: user.name,
      bs: user.bs
    });
  }
}
