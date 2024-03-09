import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Person } from './IPerson.interface';
import { Partner } from './partner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  server = '';
  agent = '';
  contract = '';
  contractName = '';

  members: string[] = [];
  candidates: string[] = [];
  missions: {[key: string]: boolean} = {};
  partners: Partner[] = [];
  instructions = '';

  membersHtml: Person[] = [];
  candidatesHtml: Person[] = [];
  PartnersProfile: {[key: string]: Person} = {};
  missionsHtml: string[] = [];

  data: Subject<any> = new Subject();

  hashes: {[key: string]: any} = {};

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  logRequestJoin(hash: string, reply: boolean | null) {
    console.log('logRequestJoin', this.hashes, hash, reply);
    if (hash in this.hashes) {
      const requestFirst = reply !== null && !reply
      const replyFirst = reply === null && 'reply' in this.hashes[hash] && this.hashes[hash].reply === false
      if (requestFirst || replyFirst) {
        this.dialog.open(DialogComponent);
        delete this.hashes[hash];
      }
    } else {
      this.hashes[hash] = {'when': new Date(),
                           'reply': reply};
    }

    const now = new Date();
    for (const key in this.hashes) {
      if (now.getTime() - this.hashes[key].when.getTime() > 60) {
        delete this.hashes[key];
      }
    }
  }
}
