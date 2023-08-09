// missions.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MissionComponent } from '../mission/mission.component';
import { RouteParamsService } from '../shared/route-params.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missions = [
    { id: 1, title: 'null', name: '' }
  ];

  constructor(private router: Router, private dialog: MatDialog, public routeParamsService: RouteParamsService) {}

  ngOnInit(): void {
    if (!this.routeParamsService.members && !this.routeParamsService.candidates) {
      this.missions = [
        { id: 1, title: 'Request to join', name: '' }
      ];
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
  
}
