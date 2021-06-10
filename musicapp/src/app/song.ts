export class Song {
  public title: string;
  public artist: string;
  public year_released: number;
  public _id: string;
  
  constructor (title: string, artist: string, year_released: number) {
      this.title = title; 
      this.artist=artist; 
      this.year_released = year_released;

      this._id = ""
    }
  } 