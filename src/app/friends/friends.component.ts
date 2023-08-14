import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/IPerson.interface';
import { RouteParamsService } from '../shared/route-params.service';
import { MiddleEllipsisPipe } from '../shared/middle-ellipsis.pipe';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(public routeParamsService: RouteParamsService ){}
  
  ngOnInit(): void {
    // this.routeParamsService.data.subscribe(val => {
    //   this.routeParamsService.membersHtml = Object.keys(this.routeParamsService.members).map(m => { return { name: m, imageUrl: `https://via.placeholder.com/300x300.png?text=${m}` } });
    // });
  }
}
