import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MissionComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(value: boolean): void {
    this.dialogRef.close(value);
    console.log("close")
  }
  

}
