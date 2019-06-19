import { TestBed } from '@angular/core/testing';

import { UsersFirestore } from './users.firestore.service';

describe('UsersFirestore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersFirestore = TestBed.get(UsersFirestore);
    expect(service).toBeTruthy();
  });
});
