import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }
    goToPostsPage() {
        this.router.navigate(['/'])
    }
}
