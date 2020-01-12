import { TestBed } from '@angular/core/testing';

import { InfiniteScrollListService } from './infinite-scroll-list.service';

describe('InfiniteScrollListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfiniteScrollListService = TestBed.get(InfiniteScrollListService);
    expect(service).toBeTruthy();
  });
});
