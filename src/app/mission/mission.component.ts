import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from '../agent.service';
import { RouteParamsService } from '../shared/route-params.service';
import { Method } from '../contract';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MissionComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: any,
    private agentService: AgentService,
    private routeParamsService: RouteParamsService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(value: boolean): void {
    if (value && this.mission.title == 'Request to join') {
      this.agentService.write(this.routeParamsService.server, 
        this.routeParamsService.agent, 
        this.routeParamsService.contract, { name: 'request_join',
        values: {}} as Method).subscribe();
    }
    this.dialogRef.close(value);
    console.log("close")
  }
  

}
