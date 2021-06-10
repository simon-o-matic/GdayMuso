import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from './song'
import { SONGS } from './mock-songs'

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  getSongs(): Observable<Song[]> { 
    const songs = of(SONGS);
    return songs;
  }
}
