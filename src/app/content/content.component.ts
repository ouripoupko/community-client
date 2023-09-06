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
    forkJoin([this.getMembers(), this.getTasks(), this.getCandidates(), this.getPartners()]).subscribe(val => {

      console.log('val')
      console.log(val)

      // let members = Object.keys(this.routeParamsService.members);
      // this.routeParamsService.membersHtml = members.map(m => { return { name: m, imageUrl: `https://via.placeholder.com/300x300.png?text=${m}` } });
      
      // for (let i = 0; i < members.length; i++) {
      //   let agent = (val[3] as Partner[]).find(a => a.agent == members[i]);
      //   if (agent) {
      //     this.getProfile(agent.address, agent.agent, agent.profile).subscribe(profile => {
      //       console.log(profile);
      //       if (profile)
      //         this.routeParamsService.membersHtml[i] = { name: `${profile.first_name} ${profile.last_name}`, imageUrl: profile.image_url } 
      //     });
      //   }
      // }

      // this.routeParamsService.candidatesHtml = this.routeParamsService.candidates.map(c => { 
      //   return { name: c, imageUrl: `https://via.placeholder.com/300x300.png?text=${c}` } 
      // });

      // for (let i = 0; i < this.routeParamsService.candidates.length; i++) {
      //   let agent = (val[3] as Partner[]).find(a => a.agent == this.routeParamsService.candidates[i]);
      //   if (agent) {
      //     this.getProfile(agent.address, agent.agent, agent.profile).subscribe(profile => {
      //       console.log(profile);
      //       if (profile)
      //         this.routeParamsService.candidatesHtml[i] = { name: `${profile.first_name} ${profile.last_name}`, imageUrl: profile.image_url } 
      //     });
      //   }
      // }


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
      this.routeParamsService.partners = value;
      value.forEach((partner: Partner) => {
        this.getProfile(partner.address, partner.agent, partner.profile).subscribe(profile => {
          console.log(profile);
          if (profile)
            this.routeParamsService.PartnersProfile[partner.agent] = { name: `${profile.first_name} ${profile.last_name}`, imageUrl: profile.image_url };
          else
            this.routeParamsService.PartnersProfile[partner.agent] = { name: partner.agent, imageUrl: `https://via.placeholder.com/300x300.png?text=${partner.agent}` }
        });
      });
    }));
  }

  getContractName() {
    this.agentService.getContracts(this.routeParamsService.server, this.routeParamsService.agent).subscribe((val: Contract[]) => {
      this.routeParamsService.contractName = val.find(x => x.id == this.routeParamsService.contract)?.name || 'My Community';
    });
  }

  getMembers() {
    // console.log(decodeURIComponent(decodeURIComponent(decodeURIComponent(server))));
    // console.log((server));
    return this.agentService.read(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, 
      {name:'get_members', arguments: [], values: {}}).pipe(tap(value => {
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
}
