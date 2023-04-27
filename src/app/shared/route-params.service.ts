import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  server = '';
  agent = '';
  contract = '';

  constructor(private route: ActivatedRoute) {}

  initialize(): void {
    this.route.params.subscribe((params) => {
      this.server = params['server'];
      this.agent = params['agent'];
      this.contract = params['contract'];
    });
  }
}
