import { TestBed } from '@angular/core/testing';

import { Reservations.FirestoreService } from './reservations.firestore.service';

describe('Reservations.FirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Reservations.FirestoreService = TestBed.get(Reservations.FirestoreService);
    expect(service).toBeTruthy();
  });
});
