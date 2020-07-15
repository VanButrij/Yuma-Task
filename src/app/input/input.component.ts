import { NgxCsvParser } from 'ngx-csv-parser';
import { selectInsert } from './../reducers/importer/importer.selector';
import { InsertUploadAction } from './../reducers/importer/importer.actions';
import { InsertState } from './../reducers/importer/importer.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {



  public insert$: Observable<Array<object>> = this.store$.pipe(select(selectInsert));

  public insertMethod = true;

  constructor(private store$: Store<InsertState>, private ngxCsvParser: NgxCsvParser) {

  }

 public input: string;

 public inputFile = false;

 public insertNew: any;

  ngOnInit(): void {

  }

  changeMethod(): void {
    this.insertMethod = !this.insertMethod;
    this.inputFile = false;
    this.input = '';
  }

  readFile(input): void {
    let file = input.target.files[0];
    if (file.type === 'text/plain') {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.input = reader.result;
        this.inputFile = true;
      }
      reader.onerror = () => {
        alert('Ошибка чтения файла!');
      }
    } else if (file.type === 'application/vnd.ms-excel') {
      try {
        this.ngxCsvParser.parse(file, { header: true}).pipe().subscribe(event => {
          this.input = JSON.stringify(event);
          this.inputFile = true ;})
      } catch (error) {
        alert('Ошибка чтения файла!')
      }
    }
  }

  inputHandler(event): void {
    this.input = event.target.value;
  }

  uploadHandler(): void {
    try {
      this.insertNew = JSON.parse(this.input);
    } catch (error) {
      alert('Введенная строка не является JSON!');
      
    }
    
    try {
      let counter = 0;
      for (let key in this.insertNew[0]) {
        counter++;
      }
      if (counter > 6) {
        throw new Error('Не более 6 свойств!');
      } else { 
        this.store$.dispatch(new InsertUploadAction(this.insertNew));
        if (document.querySelector('#inputArea'))
        {document.querySelector('#inputArea').value = '';}
        this.input = '';
      }

    } catch (error) {
      alert(error.message);
    }

  }
}

// [{
//   "date":"05.03.1999",
//   "road":"open",
//   "exit":"Over the third floor",
//   "dater":"05.03.1999",
//   "roadr":"open",
//   "exitr":"Over the third floor"
// },
// {
//   "date":"07.10.1999",
//   "road":"close",
//   "exit":"Over the third floor",
//   "dater":"05.03.1999",
//   "roadr":"open",
//   "exitr":"Over the third floor"
// },
// {
//   "date":"13.08.2001",
//   "road":"warn",
//   "exit":"now",
//   "dater":"05.03.1999",
//   "roadr":"open",
//   "exitr":"Over the third floor"
// }]