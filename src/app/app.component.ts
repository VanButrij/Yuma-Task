import { selectInsert } from './reducers/importer/importer.selector';
import { InsertState } from './reducers/importer/importer.reducer';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface Card {
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public insert$: Observable<Array<object>> = this.store$.pipe(select(selectInsert));

    constructor(private store$: Store<InsertState>) {

    }

}
