import { Component } from '@angular/core';

import { SongService} from '../song.service'
import { Song } from '../song';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent {

  model = new Song('', '', 0);
  genres = ["Rock", "Punk", "Jazz", "Ska", "Pop", "Rap", "Classical"]

  submitted = false;

  constructor(private songService: SongService) { }

  onSubmit() { 
    this.submitted = true; 
    console.log("Adding a song", this.model);
    this.songService.addSong(this.model).subscribe(() =>{});

  }
  
  newSong() {
    this.model = new Song('', '', 0);
  }
}