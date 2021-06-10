import { Component, OnInit } from '@angular/core';

import { SongService} from '../song.service'

import { Song } from '../song'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = []
  

  constructor(private songService: SongService) { 
    songService.subscribeSongsChanged(() => this.getSongs());
  }

  getSongs(): void { 
    this.songService.getSongs().subscribe(songs => this.songs = songs);
  }

  deleteSong(id: string): void {
    this.songService.deleteSong(id).subscribe(() => this.getSongs());
  }

  ngOnInit(): void {
    this.getSongs();
  }
}
