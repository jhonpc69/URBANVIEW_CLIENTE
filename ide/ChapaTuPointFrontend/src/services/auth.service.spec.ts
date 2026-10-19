import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService verification', () => {
  let service: AuthService;
  let http: HttpTestingController;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {http.verify(); localStorage.clear();});

  it('does not save a session when only a verification code has been sent', () => {
    service.login('demo@urbanview.test', 'password').subscribe();
    const request = http.expectOne(r => r.url === '/api/auth/login');
    expect(request.request.params.get('email')).toBe('demo@urbanview.test');
    request.flush({status: true, message: 'Código enviado'});
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('idUsuario')).toBeNull();
  });

  it('stores the verified session and user data', () => {
    service.verifyCode('demo@urbanview.test', 'password', '123456').subscribe();
    const request = http.expectOne(r => r.url === '/api/auth/verify-code');
    expect(request.request.params.get('code')).toBe('123456');
    request.flush({access_token: 'access', refresh_token: 'refresh', usuario: {
      idUsuario: 7, nombresCompletos: 'Usuario Demo', dni: '00000001', tipoUsuario: 0
    }});
    expect(localStorage.getItem('accessToken')).toBe('access');
    expect(localStorage.getItem('nombresCompletos')).toBe('Usuario Demo');
    expect(localStorage.getItem('idUsuario')).toBe('7');
  });

  it('does not create a session for a rejected code', () => {
    service.verifyCode('demo@urbanview.test', 'password', '000000').subscribe({error: () => {}});
    http.expectOne(r => r.url === '/api/auth/verify-code').flush({}, {status: 400, statusText: 'Bad Request'});
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
