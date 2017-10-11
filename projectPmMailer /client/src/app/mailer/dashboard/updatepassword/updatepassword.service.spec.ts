import { TestBed, inject } from '@angular/core/testing';

import { UpdatepasswordService } from './updatepassword.service';

describe('UpdatepasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatepasswordService]
    });
  });

  it('should be created', inject([UpdatepasswordService], (service: UpdatepasswordService) => {
    expect(service).toBeTruthy();
  }));
});
