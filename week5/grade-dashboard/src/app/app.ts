import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StudentCard} from './student-card/student-card';
import {StatsBar} from './stats-bar/stats-bar';
import {Student} from './student.interface';

@Component({
  selector: 'app-root',
  imports: [FormsModule, StudentCard, StatsBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  searchTerm: string = '';

  students: Student[] = [
    {id: 1, name: 'Alice Chen', grade: 94, subject: 'Web Development'},
    {id: 2, name: 'Bob Seitkali', grade: 58, subject: 'Web Development'},
    {id: 3, name: 'Dana Bekova', grade: 76, subject: 'Web Development'},
    {id: 4, name: 'Erik Nurlanov', grade: 88, subject: 'Web Development'},
    {id: 5, name: 'Fatima Abenova', grade: 42, subject: 'Web Development'},
    {id: 6, name: 'Giorgi Tao', grade: 97, subject: 'Web Development'},
  ];

  // Filtered list — recalculates whenever searchTerm changes
  get filteredStudents(): Student[] {
    const term: string = this.searchTerm.toLowerCase().trim();
    if (!term) return this.students;
    return this.students.filter(s =>
      s.name.toLowerCase().includes(term)
    );
  }

  // Remove a student by id
  removeStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }

  // Increase a student's grade by 5 (max 100)
  bumpGrade(id: number): void {
    this.students = this.students.map(s =>
      s.id === id
        ? {...s, grade: Math.min(100, s.grade + 5)}
        : s
    );
  }

  // Add a new student with a random grade
  addStudent(): void {
    const newId: number = Math.max(0, ...this.students.map(s => s.id)) + 1;
    const randomGrade: number = Math.floor(Math.random() * 70) + 30; // 30–99
    this.students = [
      ...this.students,
      {
        id: newId,
        name: `Student ${newId}`,
        grade: randomGrade,
        subject: 'Web Development'
      }
    ];
  }
}
