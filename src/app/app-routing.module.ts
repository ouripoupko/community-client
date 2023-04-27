import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { FriendsComponent } from './friends/friends.component';
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
  {
    path: ':server/:agent/:contract/tasks', component: MissionsComponent
  },
  {
    path: ':server/:agent/:contract/friends', component: FriendsComponent 
  },
  {
    path: ':server/:agent/:contract/candidates', component: CandidatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
