// missions.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MissionComponent } from '../mission/mission.component';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent {
  missions = [
    { id: 1, title: 'Mission 1', name: 'Name 1' },
    { id: 2, title: 'Mission 2', name: 'Name 2' },
    { id: 3, title: 'Mission 3', name: 'Name 3' },
    { id: 4, title: 'Mission 4', name: 'Name 4' }
  ];

  constructor(private router: Router, private dialog: MatDialog) {}

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
