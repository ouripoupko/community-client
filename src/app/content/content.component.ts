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
      this.getPartners().subscribe(_ => {this.loadData();});
      
      this.agentService.listen(this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract)
        .addEventListener('message', message => {
        if(message.data.length > 0) {
          let content = JSON.parse(message.data)
          if (content.action == 'a2a_connect') {
            this.getPartners().subscribe();
          } else {
            if (content.reply === false && content.agent === this.routeParamsService.agent) {
              this.routeParamsService.logRequestJoin(content.request, content.reply)
            }
            this.loadData();
          }
        }
      });
    });
  }

  loadData() {
    this.getAll().subscribe(_ => {

      if (!this.routeParamsService.members.includes(this.routeParamsService.agent) && !this.routeParamsService.candidates.includes(this.routeParamsService.agent)) {
        this.routeParamsService.missionsHtml = [
          this.routeParamsService.agent
        ];
      }
      else {
        this.routeParamsService.missionsHtml = Object.keys(this.routeParamsService.missions);
      }
    })
    this.routeParamsService.data.next(true);
  }

  getProfile(server: string, agent: string, profile: string, ) {
    let name_method = { name: 'get_profile', values: {}}as Method;
    return this.agentService.read(server, agent, profile, name_method);
  }
  
  getPartners() {
    let partners_method = { name: 'get_partners', values: {}} as Method;
    return this.agentService.read(this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract, partners_method)
    .pipe(tap(value => {
      this.routeParamsService.partners = value;
      value.forEach((partner: Partner) => {
        this.routeParamsService.PartnersProfile[partner.agent] = { name: partner.agent, imageUrl: `https://via.placeholder.com/300x300.png?text=${partner.agent}` }
        if (partner.profile) {
          this.getProfile(partner.address, partner.agent, partner.profile).subscribe(profile => {
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

  getAll() {
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_all', arguments: [], values: {}}).pipe(tap(value => {
        this.routeParamsService.members = Object.keys(value['members']);
        this.routeParamsService.missions = value['tasks'];
        this.routeParamsService.candidates = value['nominates'];
        this.routeParamsService.instructions = value.properties?.instructions || '';
      })
    );
  }
}
