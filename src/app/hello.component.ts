import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MissionService } from './mission.service';

@Component({
  selector: 'hello',
template: `
 <p>
  {{astronaut}}: <strong>{{mission}}</strong>
  <button
    (click)="confirm()"
    [disabled]="!announced || confirmed">
    Confirm
  </button>
 </p>
 `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
@Input() astronaut: string;
 mission = '<no mission announced>';
 confirmed = false;
 announced = false;
 subscription: Subscription;

 constructor(private missionService: MissionService) {
  this.subscription = missionService.missionAnnounced$.subscribe(
    mission => {
    this.mission = mission;
    this.announced = true;
    this.confirmed = false;
  });
 }
 confirm() {
  this.confirmed = true;
  this.missionService.confirmMission(this.astronaut);
 }
 ngOnDestroy() {
  // prevent memory leak when component destroyed
  this.subscription.unsubscribe();
 }
}
