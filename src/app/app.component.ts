import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from './shared/route-params.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private routeParamsService: RouteParamsService) {}

  ngOnInit(): void {
    this.routeParamsService.initialize();
  }
  title = 'community-client';
}
