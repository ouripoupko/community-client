import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from '../agent.service';
import { RouteParamsService } from '../shared/route-params.service';
import { Method } from '../contract';
import { Mission } from '../shared/IMission.interface';
import { MiddleEllipsisPipe } from '../shared/middle-ellipsis.pipe';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MissionComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: Mission,
    private agentService: AgentService,
    public routeParamsService: RouteParamsService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(value: boolean): void {
    if (value) {
      this.agentService.write(this.routeParamsService.server, 
        this.routeParamsService.agent, 
        this.routeParamsService.contract, { name: 'approve',
        values: {"approved": this.mission.title}} as Method).subscribe();
    }
    this.dialogRef.close(value);
    console.log("close")
  }
  

}
