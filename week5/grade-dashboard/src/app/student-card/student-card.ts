import {Component, OnChanges, OnInit, OnDestroy, input, output, SimpleChanges} from '@angular/core';
import {Student} from '../student.interface';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard implements OnInit, OnChanges, OnDestroy {
  // input
  student = input.required<Student>()

  // output
  remove = output<number>()
  gradeUp = output<number>()

  // local states
  statusLabel: string = '';
  statusColor: string = '';
  secondsOnScreen: number = 0;
  isNew: boolean = true;

  private intervalId: any;

  // lifecycle hooks
  ngOnInit(): void {
    console.log(`[ngOnInit] "${this.student().name}" appeared on the screen`);

    // timer
    this.intervalId = setInterval(() => {
      this.secondsOnScreen++;
    }, 1000);

    setTimeout(() => {
      this.isNew = false;
    }, 3000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      const updatedStudent = changes['student'].currentValue;
      this.recalculateStatus(updatedStudent.grade);
    }
  }

  ngOnDestroy(): void {
    console.log(`[ngOnInit] "${this.student().name}" removed`);
    clearInterval(this.intervalId)
  }

  // methods
  private recalculateStatus(grade: number): void {
    if (grade >= 90) {
      this.statusLabel = 'Excellent';
      this.statusColor = 'green';
    } else if (grade >= 75) {
      this.statusLabel = 'Good';
      this.statusColor = 'blue';
    } else if (grade >= 60) {
      this.statusLabel = "Passing";
      this.statusColor = 'orange';
    } else {
      this.statusLabel = 'Failing';
      this.statusColor = 'red';
    }
  }

  onRemove(): void {
    this.remove.emit(this.student().id);
  }

  onGradeUp(): void {
    this.gradeUp.emit(this.student().id);
  }
}
