import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimeDetailComponent} from './anime-detail';

describe('AnimeDetailComponent', () => {
  let component: AnimeDetailComponent;
  let fixture: ComponentFixture<AnimeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimeDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
