import { TestBed, async, inject } from '@angular/core/testing';

import { LoginSigninGuard } from './login-signin.guard';

describe('LoginSigninGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginSigninGuard]
    });
  });

  it('should ...', inject([LoginSigninGuard], (guard: LoginSigninGuard) => {
    expect(guard).toBeTruthy();
  }));
});
