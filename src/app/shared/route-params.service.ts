import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  server = '';
  agent = '';
  contract = '';

  members: string[] = [];
  candidates: string[] = [];

  constructor(private route: ActivatedRoute) {}

}
