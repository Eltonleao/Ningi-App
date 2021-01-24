import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalisesPage } from './analises.page';

describe('AnalisesPage', () => {
  let component: AnalisesPage;
  let fixture: ComponentFixture<AnalisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
