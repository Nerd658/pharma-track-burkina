import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesTable } from './medicines-table';

describe('MedicinesTable', () => {
  let component: MedicinesTable;
  let fixture: ComponentFixture<MedicinesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
