import { Component, inject } from '@angular/core';
import { Property } from '../../../../data/property/property';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe, NgStyle } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-details',
  imports: [JsonPipe, LightgalleryModule, NgStyle, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  property: Property = this.activatedRoute.snapshot.data['property']?.data;


  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
  };
}
