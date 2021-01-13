import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NingisPage } from './ningis.page';

describe('NingisPage', () => {
  let component: NingisPage;
  let fixture: ComponentFixture<NingisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NingisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NingisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
