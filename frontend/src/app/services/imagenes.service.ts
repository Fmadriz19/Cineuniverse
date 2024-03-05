import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  getData() {
    
    return [
      {
        itemImageSrc: 'assets/image/deadpool.jpg',
        thumbnailVideoSrc: 'https://www.youtube.com/embed/kxyyKU8rgaU?si=gAcJmXiN6Wq7Zg1Y',
        alt: 'Description for Image 1',
        title: 'Deadpool'
      },
      {
        itemImageSrc: 'assets/image/juguete.jpg',
        thumbnailVideoSrc: 'https://www.youtube.com/embed/0pXHwz-_HqE?si=zAKWZZi4XXLN4SEw',
        alt: 'Description for Image 2',
        title: 'Juguete Diabolico'
      },
      {
        itemImageSrc: 'assets/image/Godzilla.jpg',
        thumbnailVideoSrc: 'https://www.youtube.com/embed/Y5nq2APYURE?si=VkE3MIRjGMaJJ-Xd',
        alt: 'Description for Image 3',
        title: 'Godzilla vs Kong'
      }
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }
}
