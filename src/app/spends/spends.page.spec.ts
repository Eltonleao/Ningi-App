import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendsPage } from './spends.page';

describe('SpendsPage', () => {
  let component: SpendsPage;
  let fixture: ComponentFixture<SpendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
