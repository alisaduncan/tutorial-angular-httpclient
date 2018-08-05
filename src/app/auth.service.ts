import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public tokenType = 'Bearer';
  public tokenValue = 'mySecretToken';
}
