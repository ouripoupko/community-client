import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/IPerson.interface';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {

  friends: Person[] = [
    {
      name: 'Alice',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Alice',
    },
    {
      name: 'Bob',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Bob',
    },
    {
      name: 'Charlie',
      imageUrl: 'https://via.placeholder.com/300x300.png?text=Charlie',
    },
  ];
}
