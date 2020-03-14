import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { MovieBookmarksComponent } from './pages/movie-bookmarks/movie-bookmarks.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { NgbdPaginationModule } from './shared/components/pagination/pagination-component.module';
import { CardComponent } from './shared/components/card/card.component';
import { SearchComponent } from './shared/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieBookmarksComponent,
    MovieInfoComponent,
    MovieListComponent,
    SearchPipe,
    CardComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbdPaginationModule
  ],
  providers: [],
  exports: [],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }

