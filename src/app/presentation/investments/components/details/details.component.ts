import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Investment } from '../../../../data/investment/investment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [JsonPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  investment: Investment = this.activatedRoute.snapshot.data['investment']?.data;
}
