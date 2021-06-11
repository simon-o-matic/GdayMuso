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

  updateSong(id: string): void {
    const song: Song | undefined = this.findSongById(id);
    if (!song) {
      console.error("The song we tried to update weirdly doesn't exist")
      return;
    }
    this.songService.updateSong(song).subscribe(() => this.getSongs());
  }

  ngOnInit(): void {
    this.getSongs();
  }

  findSongById = (id: string) : Song | undefined => this.songs.find((song) => song._id == id);
}
