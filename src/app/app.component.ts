import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blueScore = 560;
  hBlueScore = 500;
  userMale: boolean;
  userWeight: number;
  calcDiff = false;

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
  theoreticalTotal: number;
  blueDiff: string;
  hBlueDiff: string;

  coeffChange(): void {
    if (this.userMale) {
      this.c1 = 310.67;
      this.c2 = 857.785;
      this.c3 = 53.216;
      this.c4 = 147.0835;
    } else if (!this.userMale) {
      this.c1 = 125.1435;
      this.c2 = 228.03;
      this.c3 = 34.5246;
      this.c4 = 86.8301;
    }
  }

  calcBlue(): void {
    if (this.userWeight) {
      this.coeffChange();
      if (!this.totalSelected) {
        this.userTotal = this.squatNo + this.benchNo + this.deadliftNo;
      }
      this.ipfPoints = 500 + 100 * (
        (this.userTotal - (this.c1 * Math.log(this.userWeight) - this.c2)) /
        (this.c3 * Math.log(this.userWeight) - this.c4)
      );
      if (this.ipfPoints < this.hBlueScore) {
        this.blueAchieved = 'None';
      } else if (this.ipfPoints >= this.hBlueScore && this.ipfPoints < this.blueScore) {
        this.blueAchieved = 'Half Blue';
      } else if (this.ipfPoints >= this.blueScore) {
        this.blueAchieved = 'Full Blue';
      }
    }
  }

  calcGoal(): void {
    if (this.goalWeight && this.goalBlue) {
      this.coeffChange();
      const goalIPF = (this.goalBlue === 'full') ? this.blueScore : (this.goalBlue === 'half') ? this.hBlueScore : null;
      this.goalTotal = +(((goalIPF - 500) / 100) * (this.c3 * Math.log(this.goalWeight) - this.c4) +
        (this.c1 * Math.log(this.goalWeight) - this.c2)).toFixed(2);
      this.goalTotalStr = this.goalTotal.toString() + ' kg';
    }
    this.calcDeviation();
  }

  onClickCalc(): void {
    this.calcDiff = !this.calcDiff;
  }

  calcDeviation(): void {
    if (this.goalTotal && this.theoreticalTotal) {
      if (this.goalTotal < this.theoreticalTotal) {
        this.blueDiff = 'achieved';
        this.hBlueDiff = 'achieved';
      } else {
        this.blueDiff = (this.goalTotal - this.theoreticalTotal).toFixed(2) + ' kg remaining';
        this.hBlueDiff = (this.goalTotal - this.theoreticalTotal).toFixed(2) + ' kg remaining';
      }
    }
  }
}
