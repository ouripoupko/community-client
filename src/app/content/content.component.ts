import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from '../shared/route-params.service';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private routeParamsService: RouteParamsService, 
    private route: ActivatedRoute,
    private agentService: AgentService){}

  ngOnInit(): void {
    console.log('init');
    this.route.queryParams.subscribe(params => {
      this.routeParamsService.server = params['server'];
      this.routeParamsService.agent = params['agent'];
      this.routeParamsService.contract = params['contract'];

      this.loadData();
      
      this.agentService.listen(this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract)
        .addEventListener('message', message => {
        if(message.data.length > 0) {
          this.loadData();
        }
      });
    });
  }

  loadData() {
    forkJoin([this.getMembers(), this.getTasks(), this.getCandidates()]).subscribe(val => {
      this.routeParamsService.data.next(null);
    })
  }

  getMembers() {
    // console.log(decodeURIComponent(decodeURIComponent(decodeURIComponent(server))));
    // console.log((server));
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_members', arguments: [], values: {}}).pipe(tap(value => {
        this.routeParamsService.members = value;
      }));
  }

  getTasks() {
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_tasks', arguments: [], values: {}}).pipe(tap(value => {
        this.routeParamsService.missions = value;
      }));
  }

  getCandidates() {
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_nominates', arguments: [], values: {}}).pipe(tap(value => {
        this.routeParamsService.candidates = value;
      }));
  }
}
