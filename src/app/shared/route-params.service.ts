import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Person } from './IPerson.interface';
import { Mission } from './IMission.interface';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  server = '';
  agent = '';
  contract = '';

  members: {[key: string]: any} = {};
  candidates: string[] = [];
  missions: {[key: string]: boolean} = {};

  membersHtml: Person[] = [];
  candidatesHtml: Person[] = [];
  missionsHtml: Mission[] = [];

  data: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute) {}

}
