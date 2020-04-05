import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MovieBookmarksComponent } from './pages/movie-bookmarks/movie-bookmarks.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { SearchComponent } from './shared/components/search/search.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppPaginationModule } from './shared/components/pagination/pagination-component.module';

@NgModule({
    declarations: [
        AppComponent,
        MovieBookmarksComponent,
        MovieInfoComponent,
        MovieListComponent,
        CardComponent,
        SearchComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AppPaginationModule,
        FontAwesomeModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [
        AppComponent
    ]

})
export class AppModule { }

