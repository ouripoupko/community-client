// missions.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MissionComponent } from '../mission/mission.component';
import { RouteParamsService } from '../shared/route-params.service';
import { MiddleEllipsisPipe } from '../shared/middle-ellipsis.pipe';
import { AgentService } from '../agent.service';
import { Method } from '../contract';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  constructor(private router: Router,
    private dialog: MatDialog,
    public routeParamsService: RouteParamsService,
    private agentService: AgentService) { }

  ngOnInit(): void {
    // this.routeParamsService.data.subscribe(val => {
    //   this.getMissions();
    // });
  }

  getMissions() {
    console.log('candidates: ', this.routeParamsService.candidates);
    console.log('agent: ', this.routeParamsService.agent);
    console.log('test: ', ![].length)
    if (!(this.routeParamsService.agent in this.routeParamsService.members) && !this.routeParamsService.candidates.includes(this.routeParamsService.agent)) {
      this.routeParamsService.missionsHtml = [
        { title: 'Request to join', status: false }
      ];
      console.log('default');
    }
    else {
      this.routeParamsService.missionsHtml = Object.entries(this.routeParamsService.missions).map(([key, val]) => {
        return { title: key, status: val };
      });
      console.log(this.routeParamsService.missionsHtml)
    }
  }

  goToMission(id: number): void {
    this.router.navigate(['/mission', id]);
  }

  openMissionDialog(mission: any): void {
    const dialogRef = this.dialog.open(MissionComponent, {
      width: '90%',
      maxWidth: '600px',
      data: mission
    });
  }

  JoinCommunity() {
    this.agentService.write(this.routeParamsService.server, 
      this.routeParamsService.agent, 
      this.routeParamsService.contract, { name: 'request_join',
      values: {}} as Method).subscribe();
  }

}
