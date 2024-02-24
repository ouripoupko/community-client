import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from '../agent.service';
import { MissionComponent } from '../mission/mission.component';
import { Mission } from '../shared/IMission.interface';
import { RouteParamsService } from '../shared/route-params.service';
import { Method } from '../contract';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {

  instrutions = '';

  constructor(
    public dialogRef: MatDialogRef<InstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: Mission,
    private agentService: AgentService,
    public routeParamsService: RouteParamsService
  ) { }

  closeDialog(value: boolean): void {
    if (value && this.instrutions && this.routeParamsService.members.length == 0) {
      this.agentService.write(this.routeParamsService.server, 
        this.routeParamsService.agent, 
        this.routeParamsService.contract, { name: 'request_join',
        values: {"instructions": this.instrutions}} as Method).subscribe();
    }
    this.dialogRef.close(value);
    console.log("close")
  }
}
