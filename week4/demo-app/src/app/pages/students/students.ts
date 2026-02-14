import {Component, signal, computed} from '@angular/core';

interface Student {
  id: number;
  name: string;
  gpa: number;
}

@Component({
  selector: 'app-students',
  standalone: true,
  template: `
    <div class="container">
      <header>
        <h1>🎓 Student List</h1>
        <p class="subtitle">Angular 21 · Signals · &#64;for</p>
      </header>

      <div class="stats">
        <div class="stat">
          <span class="stat-value">{{ students().length }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ honorsCount() }}</span>
          <span class="stat-label">Honors</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ avgGpa() }}</span>
          <span class="stat-label">Avg GPA</span>
        </div>
      </div>

      <div class="add-form">
        <input
          #nameInput
          placeholder="Student name"
          class="input"
          (keydown.enter)="add(nameInput, gpaInput)"
        >
        <input
          #gpaInput
          type="number"
          step="0.1"
          min="0"
          max="4"
          placeholder="GPA"
          class="input input-small"
          (keydown.enter)="add(nameInput, gpaInput)"
        >
        <button class="btn btn-add" (click)="add(nameInput, gpaInput)">
          + Add
        </button>
      </div>

      <ul class="student-list">
        @for (s of students(); track s.id) {
          <li class="student-item" [class.honors]="s.gpa >= 3.5">
            <div class="student-info">
              <span class="student-name">{{ s.name }}</span>
              <span class="student-gpa"
                    [class.gpa-high]="s.gpa >= 3.5"
                    [class.gpa-low]="s.gpa < 2.5">
                GPA: {{ s.gpa }}
              </span>
            </div>
            <button class="btn btn-remove" (click)="remove(s.id)">✕</button>
          </li>
        } @empty {
          <li class="empty-state">
            <span class="empty-icon">📋</span>
            <p>No students yet. Add someone above!</p>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #0f0f1a;
      color: #e8e8f0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      padding-top: 40px;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 0 20px;
    }

    header {
      text-align: center;
      margin-bottom: 30px;
    }

    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .subtitle {
      margin: 5px 0 0;
      color: #8888a8;
      font-size: 0.9rem;
    }

    .stats {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
    }

    .stat {
      flex: 1;
      background: #191924;
      border: 1px solid #2d2d3a;
      border-radius: 12px;
      padding: 15px 10px;
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #a29bfe;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #7f8fa6;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .add-form {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
    }

    .input {
      background: #191924;
      border: 1px solid #2d2d3a;
      color: white;
      padding: 12px;
      border-radius: 8px;
      outline: none;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .input:focus {
      border-color: #6c5ce7;
    }

    .input[placeholder="Student name"] {
      flex: 1;
    }

    .input-small {
      width: 80px;
    }

    .btn {
      border: none;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.1s;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-add {
      background: #6c5ce7;
      color: white;
      padding: 0 20px;
      font-size: 1rem;
    }

    .btn-add:hover {
      background: #5a4bd1;
    }

    .student-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .student-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #191924;
      border: 1px solid #2d2d3a;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 10px;
    }

    .student-item.honors {
      border-left: 4px solid #00cec9;
    }

    .student-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .student-name {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .student-gpa {
      font-size: 0.8rem;
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      background: #2d2d3a;
      width: fit-content;
    }

    .gpa-high {
      color: #00cec9;
      background: rgba(0, 206, 201, 0.1);
    }

    .gpa-low {
      color: #ff7675;
      background: rgba(255, 118, 117, 0.1);
    }

    .btn-remove {
      background: transparent;
      color: #636e72;
      font-size: 1.2rem;
      padding: 5px 10px;
    }

    .btn-remove:hover {
      color: #ff7675;
      background: rgba(255, 118, 117, 0.1);
    }

    .empty-state {
      text-align: center;
      color: #636e72;
      margin-top: 40px;
    }

    .empty-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 10px;
      opacity: 0.5;
    }
  `]
})
export class StudentsComponent {
  students = signal<Student[]>([]);
  nextId = 1;

  honorsCount = computed(() =>
    this.students().filter(s => s.gpa >= 3.5).length
  );

  avgGpa = computed(() => {
    const list = this.students();
    if (list.length === 0) return '—';
    const avg = list.reduce((sum, s) => sum + s.gpa, 0) / list.length;
    return avg.toFixed(2);
  });

  add(nameEl: HTMLInputElement, gpaEl: HTMLInputElement) {
    const name = nameEl.value.trim();
    const gpa = parseFloat(gpaEl.value);

    if (!name || isNaN(gpa) || gpa < 0 || gpa > 4) return;

    this.students.update(list => [
      ...list,
      {id: this.nextId++, name, gpa}
    ]);

    nameEl.value = '';
    gpaEl.value = '';
    nameEl.focus();
  }

  remove(id: number) {
    this.students.update(list =>
      list.filter(s => s.id !== id)
    );
  }
}
