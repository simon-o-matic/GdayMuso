import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
}
