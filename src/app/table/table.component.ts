import { FormControl, Validators } from '@angular/forms';
import { InsertChooseAction, InsertRemoveAction, InsertAddNewAction, InsertSetValuesAction, InsertEditOneAction } from './../reducers/importer/importer.actions';
import { InsertState } from './../reducers/importer/importer.reducer';
import { selectInsert, selectChoosen, selectEditingOne, selectKeysArray, selectAddedOne } from './../reducers/importer/importer.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  public insert$: Observable<Array<object>> = this.store$.pipe(select(selectInsert));

  public choosen$: Observable<number> = this.store$.pipe(select(selectChoosen));

  public editingOne$: Observable<number> = this.store$.pipe(select(selectEditingOne));

  public keysArray$: Observable<Array<string>> = this.store$.pipe(select(selectKeysArray))

  public addedOne$: Observable<boolean> = this.store$.pipe(select(selectAddedOne))

  public firstInput: string;
  public secondInput: string;
  public thirdInput: string;
  public fourthInput: string;
  public fifthInput: string;
  public sixthInput: string;
  public saveId: number;

  public added: boolean;

  public insert: Array<object>;

  public keysArray: Array<string>;

  public numOfInputs = 0;

  public choosen: number;

  constructor(private store$: Store<InsertState>) {

  }

  ngOnInit(): void {
    this.insert$.pipe().subscribe(event => this.insert = event)
    this.keysArray$.pipe().subscribe(event => this.keysArray = event);
    this.addedOne$.pipe().subscribe(event => this.added = event);
  }

  inputHandler(event, iterId): void {
    if (iterId !== this.saveId) {
      this.saveId = iterId;
    }
    switch(event.target.id) {
      case 'input1': {
        this.firstInput = event.target.value;

        return 
      }
      case 'input2': {
        this.secondInput = event.target.value;

        return
      }
      case 'input3': {
        this.thirdInput = event.target.value;

        return
      }
      case 'input4': {
        this.fourthInput = event.target.value;

        return
      }
      case 'input5': {
        this.fifthInput = event.target.value;

        return
      }
      case 'input6': {
        this.sixthInput = event.target.value;

        return
      }
    }
  }

  validatorRequired(value) {
    const control = new FormControl(value, Validators.required);
    if (control.errors === null || control.pristine === false || control.value !== null) {
      this.numOfInputs += 1;
    }
  }

  insertValues(): void {
    this.validatorRequired(this.firstInput);
    this.validatorRequired(this.secondInput);
    this.validatorRequired(this.thirdInput);
    this.validatorRequired(this.fourthInput);
    this.validatorRequired(this.fifthInput);
    this.validatorRequired(this.sixthInput);
    
    try {
      if (this.numOfInputs === this.keysArray.length) {
        this.numOfInputs = 0;
        this.store$.dispatch(new InsertSetValuesAction(this.firstInput, this.secondInput, this.thirdInput ,this.fourthInput, this.fifthInput ,this.sixthInput , this.saveId));
        this.firstInput = this.secondInput = this.thirdInput = this.fourthInput = this.fifthInput = this.sixthInput = '';

    } else {
      this.numOfInputs = 0;
      throw new Error ('Заполните все поля!');
      
    }
    } catch (error) {
      alert(error.message);
    }

  }

  chooseOne(choosen): void {
    this.store$.dispatch(new InsertChooseAction(choosen));
  }

  editOne(): void {
    this.store$.dispatch(new InsertEditOneAction());
  }

  addOne(): void {
    this.store$.dispatch(new InsertAddNewAction());
  }

  removeOne(): void {

      const confirmRemove = confirm('Подтверждаете удаление?');
      if (confirmRemove) {
        this.store$.dispatch(new InsertRemoveAction());
      }
    }

}
