import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { AddFavouriteMovieService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavouriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showDetailsDialog(
    title: string,
    imagePath: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagePath, description, director, genre },
      panelClass: 'details-dialog',
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      panelClass: 'genre-dialog',
    });
  }

  showDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
      panelClass: 'director-dialog',
    });
  }

  addFavorite(id: string, title: string): void {
    this.fetchApiData2.addFavouriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      let favmovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favmovies);
      this.snackBar.open(`${title} has been added to your favorite movies list`, 'OK', {
        duration: 2000,
      });
    });

  }
}
