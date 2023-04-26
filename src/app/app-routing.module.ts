import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { FriendsComponent } from './friends/friends.component';
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: MissionsComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'candidates', component: CandidatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
