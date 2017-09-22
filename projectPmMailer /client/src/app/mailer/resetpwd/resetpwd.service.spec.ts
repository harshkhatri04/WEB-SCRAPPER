import { TestBed, inject } from '@angular/core/testing';

import { ResetpwdService } from './resetpwd.service';

describe('ResetpwdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetpwdService]
    });
  });

  it('should be created', inject([ResetpwdService], (service: ResetpwdService) => {
    expect(service).toBeTruthy();
  }));
});
