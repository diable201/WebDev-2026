import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="header-page">
      <h1>Header Page</h1>
      <p>This is the header component page</p>
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

    .header-page {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin: 0 0 20px 0;
    }

    p {
      font-size: 1.1rem;
      color: #8888a8;
    }
  `]
})
export class Header {

}
