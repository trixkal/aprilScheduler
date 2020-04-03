import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Calendar } from '../interfaces/calendar.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public chats: any[] = [];
  public authenticationState = new BehaviorSubject(false);
  private isAdmin: boolean;
  private items: AngularFirestoreCollection<Calendar>;

  constructor(private firestore: AngularFirestore) {}


   private saveToken(isAdmin: boolean) {
    if (isAdmin) {
      localStorage.setItem('type', 'admin');
    } else {
      localStorage.setItem('type', 'user');
    }
  }

  login() {
    this.authenticationState.next(true);
    this.items = this.firestore.collection<Calendar>('calendar', ref =>
    ref.orderBy('date', 'desc').limit(5));

    this.items = this.firestore.collection<any>('calendar');
    // // this.items = this.firestore.collection('chats');
    

    this.items.valueChanges().pipe(
      map( (messages: any[]) => {
        // console.log(messages);
        this.chats = [];
        for (const message of messages) {
          console.log(message);
          this.chats.unshift(message);
        }

      })
    ).subscribe( epa => {
      console.log(epa);

    })
    ;
  }

  addCalendarEvent() {
    const calendar: Calendar = {
      name: 'this.user.name',
      title: 'string',
      startDate: new Date(),
      endDate: new Date(),
      uid: 'string',
      status: 'string'
    };

    this.items.add(calendar)
      .then( () => console.log(''))
      .catch((err) => console.error('Error al enviar', err));
  }

  logout() {
      this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
