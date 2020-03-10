import { TestBed } from '@angular/core/testing';

import { MovieBookmarksService } from './movie-bookmarks.service';

describe('MovieBookmarksService', () => {
  let service: MovieBookmarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieBookmarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
