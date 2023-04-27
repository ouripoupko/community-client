import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from '../shared/route-params.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private routeParamsService: RouteParamsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeParamsService.server = params['server'];
      this.routeParamsService.agent = params['agent'];
      this.routeParamsService.contract = params['contract'];
    });
  }
}
