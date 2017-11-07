import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'hammerjs';
import { Observable } from 'rxjs/Rx';

import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum';

import {
  NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation,
  NgxGalleryImageSize, NgxGalleryComponent, NgxGalleryLayout,
  NgxGalleryOrder
} from 'ngx-gallery';

import { Example } from './example.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  examples: Example[];

  constructor(private loremIpsumService: NgxLoremIpsumService, private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any, private sanitization: DomSanitizer) { }

  ngOnInit(): void {

    this.examples = new Array<Example>();

    this.examples.push(
    new Example('Preview with zoom', this.getImages(true), [{
        previewZoom: true
      }]))
  }
  getUrlTitle(title: string) {
    return title.toLowerCase()
      .replace(new RegExp(' ', 'g'), '-')
      .replace(new RegExp('---', 'g'), '-');
  }

  private getAsyncImages(): Observable<NgxGalleryImage[]> {
    return Observable.of(this.getImages()).delay(5000);
  }

  private getImages(description: boolean = false, randomCount: boolean = false, randomize: boolean = true): NgxGalleryImage[] {
    let images = new Array<NgxGalleryImage>();
    let indexes = [1, 2, 3, 4, 5, 6, 7, 8];

    if (randomize) {
      indexes = this.randomizeArray(indexes);
    }

    if (randomCount) {
      indexes = indexes.slice(0, this.getRandomInt(1, 4));
    }

    indexes.map(i => images.push(this.getImage(i, description)));

    return images;
  }

  private getImage(index: number, description: boolean): NgxGalleryImage {
    return {
      small: 'assets/img/' + index + '-small.jpeg',
      medium: 'assets/img/' + index + '-medium.jpeg',
      big: 'assets/img/' + index + '-big.jpeg',
      description: description ? this.getRandomDescription() : ''
    }
  }
  private getRandomDescription(): string {
    return this.loremIpsumService.getRandom(1, 5);
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomizeArray(numbersArray: number[]) {
    return numbersArray.sort(() => .5 - Math.random());
  }
}
