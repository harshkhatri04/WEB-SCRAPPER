import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';

/*describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
*/

describe('Service : LoginService',()=>{

	let service : LoginService;
	let http;

	beforeEach(()=>{
		service = new LoginService(http)
	})

		it('should return response'),()=>{
			expect(service.google()).toBeTruthy();
		}

		it('should return response'),()=>{
			expect(service.facebook()).toBeTruthy();
		}

	afterEach(()=>{
		service = null;
	})	
})
