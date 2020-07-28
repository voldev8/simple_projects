class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }
  get isCheckedOut() {
    return this._isCheckedOut;
  }
  get ratings() {
    return this._ratings;
  }
  set isCheckedOut(value) {
    this._isCheckedOut = value;
  }
  getAverageRating() {
    let sumRatings = this.ratings.reduce((acc, next) => acc + next);
    return sumRatings / this.ratings.length;
  }
  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }
  addRating(rating) {
    this.ratings.push(rating);
  }
}

class Book extends Media {
  constructor(author, title, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }
  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
}

class Movie extends Media {
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }
  get director() {
    return this.director;
  }
  get runTime() {
    return this.runTime;
  }
}

class CD extends Media {
  constructor(artist, title, songs) {
    super(title);
    this._artist = artist;
    this._songs = songs;
  }
  get artist() {
    return this.artist;
  }
  get songs() {
    return this.songs;
  }
}

const historyOfEverything = new Book(
  'Bill Bryson',
  'A Short History of Nearly Everything',
  544
);
console.log(historyOfEverything.title);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.ratings);
console.log(historyOfEverything.getAverageRating());
