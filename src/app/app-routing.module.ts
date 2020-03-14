import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieBookmarksComponent } from './pages/movie-bookmarks/movie-bookmarks.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { AppComponent } from './app.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';


const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'bookmarks', component: MovieBookmarksComponent },
    { path: 'info', component: MovieInfoComponent },
    { path: 'info/:id', component: MovieInfoComponent },
    { path: '', component: MovieListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
