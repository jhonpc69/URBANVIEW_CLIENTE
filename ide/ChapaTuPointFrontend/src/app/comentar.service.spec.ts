import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ComentarService } from '../services/comentar.service';

describe('ComentarService', () => {
  let service: ComentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ComentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
