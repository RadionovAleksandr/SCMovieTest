import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-bookmarks',
  templateUrl: './movie-bookmarks.component.html',
  styleUrls: ['./movie-bookmarks.component.css']
})
export class MovieBookmarksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPostsPage() {
    this.router.navigate(['/bookmarks'])
  }
}
