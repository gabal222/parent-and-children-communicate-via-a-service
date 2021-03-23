import { Component, VERSION } from '@angular/core';
import { MissionService } from './mission.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 astronauts = ['Lovell', 'Swigert', 'Haise'];
 history: string[] = [];
 missions = ['Fly to the moon!',
 'Fly to mars!',
 'Fly to Vegas!'];
 nextMission = 0;
 constructor(private missionService: MissionService) {
  missionService.missionConfirmed$.subscribe(
    astronaut => {
      console.log(astronaut)
    this.history.push(`${astronaut} confirmed the mission`);
  });

  missionService.missionAnnounced$.subscribe(
    announce => {
      console.log(announce)
      this.history.push(`Mission ${announce} announces`)
    }
  )
 }

 announce() {
  let mission = this.missions[this.nextMission++];
  this.missionService.announceMission(mission);
  if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
 }

}
