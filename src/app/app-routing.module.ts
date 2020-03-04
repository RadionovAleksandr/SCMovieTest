import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieBookmarksComponent } from './movie-bookmarks/movie-bookmarks.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppComponent } from './app.component';


const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'bookmarks', component: MovieBookmarksComponent },
    { path: 'info', component: MovieInfoComponent },
    { path: '', component: MovieListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
