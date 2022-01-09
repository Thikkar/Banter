import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private articleSource = new BehaviorSubject<object>({});
  currentArticle = this.articleSource.asObservable();

  private userSource = new BehaviorSubject<object>({});
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeArticle(newArticle: any) {
    this.articleSource.next(newArticle)
  }

  changeUser(newUser: any) {
    this.userSource.next(newUser)
  }
}
