import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import randomName from './random-name';

import { Song } from './song'

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songApiUrl = 'http://localhost:8080';
  songChangeEmitter = new EventEmitter();

  constructor(private http: HttpClient) { }

  songsChanged() {
    this.songChangeEmitter.emit("songschanged");
  }

  subscribeSongsChanged(handler: any) {
    this.songChangeEmitter.subscribe(handler);
  }

  addSong(song: Song) {
    this.http.post<any>(this.songApiUrl + "/song", {song: song} ).subscribe(()=>this.songsChanged());
  }

  getSongs(): Observable<Song[]> { 
    // filters out test data
     return this.http.get<any>(this.songApiUrl + "/songs").pipe(map(data => {
        return data.songs.filter((song: any) => song.title)
     }))
  }

  deleteSong(id: string) : Observable<any> {
    // todo hanle the response
    return this.http.delete(this.songApiUrl + /song/ + id);
  }

  updateSong(song: Song): Observable<any>  {
    // fun hack for updating
    randomiseSong(song);
    return this.http.put(this.songApiUrl + /song/ + song._id, {song: song});
  }
}
 
const randomiseSong = (song: Song) => {
  song.title = "Tiptoe through " + (Math.floor(Math.random() * 100) + " Tulips");
  song.artist = randomName();
  song.year_released = 1920 + Math.floor(Math.random() * (2021 - 1920) + 1); // Did anything good come out before 1920???
}