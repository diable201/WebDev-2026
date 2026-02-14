import {Routes} from '@angular/router';
import {Header} from './header/header';
import {StudentsComponent} from './pages/students/students';

export const routes: Routes = [
  {path: '', component: StudentsComponent},
  {path: 'header', component: Header}
];
