import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() { }

  public tokenType = 'Bearer';
  public tokenValue = 'mySecretToken';
}
