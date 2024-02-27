import { Component, OnInit } from '@angular/core';
import { RouteParamsService } from '../shared/route-params.service';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { forkJoin, tap } from 'rxjs';
import { Contract, Method } from '../contract';
import { Partner } from '../shared/partner';

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

  loadData() {
    this.getPartners().subscribe(_ => {
      forkJoin([this.getMembers(), this.getTasks(), this.getCandidates(), this.getProperties()]).subscribe(val => {

        console.log('val', val);

        if (!this.routeParamsService.members.includes(this.routeParamsService.agent) && !this.routeParamsService.candidates.includes(this.routeParamsService.agent)) {
          this.routeParamsService.missionsHtml = [
            this.routeParamsService.agent
            // { title: 'Request to join', status: false, key: this.routeParamsService.agent }
          ];
          console.log('default');
        }
        else {
          this.routeParamsService.missionsHtml = Object.keys(this.routeParamsService.missions);
          // .map( ([key, val]) => {
          //   return {title: key, status: val};
          // });
          console.log(this.routeParamsService.missionsHtml)
        }
      })
    })
    this.routeParamsService.data.next(true);
  }

  getProfile(server: string, agent: string, profile: string, ) {
    let name_method = { name: 'get_profile', values: {}}as Method;
    return this.agentService.read(server, agent, profile, name_method);
      // .subscribe(profile => {this.friends[key].name = profile.first_name + ' ' profile.last_name; this.friends[key].imageUrl = profile.image_url});
  }
  
  getPartners() {
    let partners_method = { name: 'get_partners', values: {}} as Method;
    return this.agentService.read(this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract, partners_method)
    .pipe(tap(value => {
      console.log('value of get partners', value);
      this.routeParamsService.partners = value;
      value.forEach((partner: Partner) => {
        this.routeParamsService.PartnersProfile[partner.agent] = { name: partner.agent, imageUrl: `https://via.placeholder.com/300x300.png?text=${partner.agent}` }
        console.log('got partner', partner);
        if (partner.profile) {
          this.getProfile(partner.address, partner.agent, partner.profile).subscribe(profile => {
            console.log('read profile', profile);
            if (profile)
              this.routeParamsService.PartnersProfile[partner.agent] = { name: `${profile.first_name} ${profile.last_name}`, imageUrl: profile.image_url };
          });
        }
      });
    }));
  }

  getContractName() {
    this.agentService.getContracts(this.routeParamsService.server, this.routeParamsService.agent).subscribe((val: Contract[]) => {
      this.routeParamsService.contractName = val.find(x => x.id == this.routeParamsService.contract)?.name || 'My Community';
    });
  }

  getMembers() {
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_members', arguments: [], values: {}}).pipe(tap(value => {
        console.log('getMembers value', value);
        this.routeParamsService.members = Object.keys(value);
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

  getProperties() {
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_properties', arguments: [], values: {}}).pipe(tap(value => {
        this.routeParamsService.instructions = value?.instructions || '';
    }));
  }
}
