import {Component, input} from '@angular/core';
import {Student} from '../student.interface';

@Component({
  selector: 'app-stats-bar',
  imports: [],
  templateUrl: './stats-bar.html',
  styleUrl: './stats-bar.css',
})
export class StatsBar {

  students = input.required<Student[]>();

  get total(): number {
    return this.students().length;
  }

  get average(): number {
    if (this.total === 0) return 0;
    const sum = this.students().reduce((acc, s) => acc + s.grade, 0);
    return Math.round(sum / this.total);
  }

  get passing(): number {
    return this.students().filter(s => s.grade >= 60).length
  }

  get failing(): number {
    return this.students().filter(s => s.grade < 60).length;
  }

  get topStudents(): number {
    return this.students().filter(s => s.grade >= 90).length;
  }
}
