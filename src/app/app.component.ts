import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userMale: boolean;
  userWeight: number;

  c1: number;
  c2: number;
  c3: number;
  c4: number;

  blueAchieved: string;
  ipfPoints: number;
  userTotal: number;
  totalSelected = false;
  squatNo: number;
  benchNo: number;
  deadliftNo: number;

  goalWeight: number;
  goalBlue: string;
  goalTotal: number;
  goalTotalStr: string;

  coeffChange(): void {
    if (this.userMale) {
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
  }

  calcBlue(): void {
    this.coeffChange();
    if (!this.totalSelected) {
      this.userTotal = this.squatNo + this.benchNo + this.deadliftNo;
    }
    this.ipfPoints = 500 + 100 * (
      (this.userTotal - (this.c1 * Math.log(this.userWeight) - this.c2)) /
      (this.c3 * Math.log(this.userWeight) - this.c4)
    );
    if (this.ipfPoints && this.userWeight && this.userWeight) {
      if (this.ipfPoints < 500) {
        this.blueAchieved = 'None';
      } else if (this.ipfPoints >= 500 && this.ipfPoints < 560) {
        this.blueAchieved = 'Half Blue';
      } else {
        this.blueAchieved = 'Full Blue';
      }
    }
  }

  calcGoal(): void {
    let goalIPF: number;
    this.coeffChange();
    if (this.goalBlue === 'full') {
      goalIPF = 560;
    } else if (this.goalBlue === 'half') {
      goalIPF = 500;
    }
    if (this.userMale && this.goalWeight && this.goalBlue) {
      this.goalTotal = +(((goalIPF - 500) / 100) * (this.c3 * Math.log(this.goalWeight) - this.c4) +
        (this.c1 * Math.log(this.goalWeight) - this.c2)).toFixed(2);
      this.goalTotalStr = this.goalTotal.toString() + ' kg';
    }
  }
}
