import { TestBed } from '@angular/core/testing';

import { FetchChatService } from './fetch-chat.service';

describe('FetchChatService', () => {
  let service: FetchChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
