import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blueAchieved: string = '';
  ipfPoints: number = 0;
  male: boolean = true;
  c1: number = 0;
  c2: number = 0;
  c3: number = 0;
  c4: number = 0;

  calcBlue(form: NgForm): void {
    this.male = (form.value.gender === 'M') ? true : false;
    if (this.male) {
      this.c1 = 310.67;
      this.c2 = 857.785;
      this.c3 = 53.216;
      this.c4 = 147.0835;
    } else {
      this.c1 = 125.1435;
      this.c2 = 228.03;
      this.c3 = 34.5246;
      this.c4 = 86.8301;
    }
    this.ipfPoints = 500 + 100 * (
      (form.value.total - (this.c1 * Math.log(form.value.weight) - this.c2)) /
      (this.c3 * Math.log(form.value.weight) - this.c4)
    );
    if (this.ipfPoints) {
      if (this.ipfPoints < 500) {
        this.blueAchieved = 'None';
      } else if (this.ipfPoints >= 500 && this.ipfPoints < 560) {
        this.blueAchieved = 'Half Blue';
      } else {
        this.blueAchieved = 'Full Blue';
      }
    }
    console.log(this.ipfPoints)
  }
}
