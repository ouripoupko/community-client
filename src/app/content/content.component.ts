import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from '../shared/route-params.service';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { take } from 'rxjs';

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
    });
    // this.routeParamsService.server = encodeURIComponent(this.route.snapshot.paramMap.get('server') as string);
    // this.routeParamsService.agent = this.route.snapshot.paramMap.get('agent') as string;
    // this.routeParamsService.contract = this.route.snapshot.paramMap.get('contract') as string;
    console.log('server: ', this.routeParamsService.server);
    console.log('server - encoded: ', encodeURIComponent(this.routeParamsService.server));
    // console.log('paramEncode', this.routeParamsService.server);
    this.getMembers();
    this.getTasks();
    this.getCandidates();
    // this.route.params.pipe(take(1)).subscribe((params) => {
    //   this.routeParamsService.server = (params['server']);
    //   this.routeParamsService.agent = params['agent'];
    //   this.routeParamsService.contract = params['contract'];

    //   console.log('param', params['server']);
    //   console.log('paramEncode', this.routeParamsService.server);
    //   this.getMembers(params['server']);
    //   //this.getTasks();
    //   //this.getCandidates();
    // });
  }

  getMembers() {
    // console.log(decodeURIComponent(decodeURIComponent(decodeURIComponent(server))));
    // console.log((server));
    this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_members', arguments: [], values: {}}).subscribe(value => {
        this.routeParamsService.members = value;
      });
  }

  getTasks() {
    this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_tasks', arguments: [], values: {}}).subscribe(value => {
        
      });
  }

  getCandidates() {
    this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_nominates', arguments: [], values: {}}).subscribe(value => {
        
      });
  }
}
