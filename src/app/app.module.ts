import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MissionsComponent } from './missions/missions.component';
import { FriendsComponent } from './friends/friends.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { MissionComponent } from './mission/mission.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MissionsComponent,
    FriendsComponent,
    CandidatesComponent,
    MissionComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
