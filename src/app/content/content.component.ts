import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from '../shared/route-params.service';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { forkJoin, tap } from 'rxjs';
import { Contract } from '../contract';

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

      this.getContractName();
      this.loadData();
      
      this.agentService.listen(this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract)
        .addEventListener('message', message => {
        if(message.data.length > 0) {
          this.loadData();
        }
      });
    });
  }

  getContractName() {
    this.agentService.getContracts(this.routeParamsService.server, this.routeParamsService.agent).subscribe((val: Contract[]) => {
      this.routeParamsService.contractName = val.find(x => x.id == this.routeParamsService.contract)?.name || 'My Community';
    });
  }

  loadData() {
    forkJoin([this.getMembers(), this.getTasks(), this.getCandidates()]).subscribe(val => {
      this.routeParamsService.data.next(true);
      this.routeParamsService.membersHtml = Object.keys(this.routeParamsService.members).map(m => { return { name: m, imageUrl: `https://via.placeholder.com/300x300.png?text=${m}` } });
      this.routeParamsService.candidatesHtml = this.routeParamsService.candidates.map(c => { return { name: c, imageUrl: `https://via.placeholder.com/300x300.png?text=${c}` } });
      if (!(this.routeParamsService.agent in this.routeParamsService.members) && !this.routeParamsService.candidates.includes(this.routeParamsService.agent)) {
        this.routeParamsService.missionsHtml = [
          { title: 'Request to join', status: false }
        ];
        console.log('default');
      }
      else {
        this.routeParamsService.missionsHtml = Object.entries(this.routeParamsService.missions).map( ([key, val]) => {
          return {title: key, status: val};
        });
        console.log(this.routeParamsService.missionsHtml)
      }
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
