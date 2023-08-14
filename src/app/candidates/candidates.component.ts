import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/IPerson.interface';
import { RouteParamsService } from '../shared/route-params.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  constructor(public routeParamsService: RouteParamsService) { }

  ngOnInit(): void {
    console.log('init candidates')
    this.routeParamsService.data.subscribe(val => {
      console.log('candidates data sub')
      this.routeParamsService.candidatesHtml = this.routeParamsService.candidates.map(c => { return { name: c, imageUrl: `https://via.placeholder.com/300x300.png?text=${c}` } });
    });
  }

}
