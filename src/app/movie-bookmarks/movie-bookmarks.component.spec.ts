import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBookmarksComponent } from './movie-bookmarks.component';

describe('MovieListComponent', () => {
  let component: MovieBookmarksComponent;
  let fixture: ComponentFixture<MovieBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBookmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
