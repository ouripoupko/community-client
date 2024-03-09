// missions.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MissionComponent } from '../mission/mission.component';
import { RouteParamsService } from '../shared/route-params.service';
import { AgentService } from '../agent.service';
import { Method } from '../contract';
import { Mission } from '../shared/IMission.interface';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent {

  constructor(private router: Router,
    private dialog: MatDialog,
    public routeParamsService: RouteParamsService,
    private agentService: AgentService) { }

  openMissionDialog(key: string): void {
    let mission = {title: key, status: this.routeParamsService.missions[key]} as Mission;
    const dialogRef = this.dialog.open(MissionComponent, {
      width: '90%',
      maxWidth: '600px',
      data: mission
    });
  }

  JoinCommunity() {
    if (this.routeParamsService.members.length == 0) {
      this.openInstructions()
    }
    else {
      this.agentService.write(this.routeParamsService.server, 
        this.routeParamsService.agent, 
        this.routeParamsService.contract, { name: 'request_join',
        values: {}} as Method).subscribe(reply => {
          this.routeParamsService.logRequestJoin(reply, null);
        });
    }
  }

  openInstructions() {
    const dialogRef = this.dialog.open(InstructionsComponent, {
      width: '90%',
      maxWidth: '600px',
      //data: mission
    });
  }

}
