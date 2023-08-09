import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { FriendsComponent } from './friends/friends.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  {
    // path: ':server/:agent/:contract',
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'tasks'
      },
      {
        path: 'tasks', component: MissionsComponent
      },
      {
        path: 'friends', component: FriendsComponent 
      },
      {
        path: 'candidates', component: CandidatesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
