import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Song } from './song'

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songApiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

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
