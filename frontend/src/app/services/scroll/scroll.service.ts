// scroll.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new Subject<number>();

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }

  updateScrollPosition(scrollPos: number) {
    this.scrollSubject.next(scrollPos);
  }
}
// Path: frontend/src/app/components/shared/navigation/navigation.component.ts
