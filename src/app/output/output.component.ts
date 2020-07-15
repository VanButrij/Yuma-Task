import { InsertDownloadAction } from './../reducers/importer/importer.actions';
import { InsertState } from './../reducers/importer/importer.reducer';
import { selectInsert, selectDownload, selectKeysArray } from './../reducers/importer/importer.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { RequiredValidator } from '@angular/forms';



@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public insert$: Observable<Array<object>> = this.store$.pipe(select(selectInsert));

  public download$: Observable<string> = this.store$.pipe(select(selectDownload));

  public keysArray$: Observable<Array<string>> = this.store$.pipe(select(selectKeysArray))

  public download: string;

  constructor(private store$: Store<InsertState>) {

  }

  public outputArray: Array<object>;

  public jsonName = 'Yuma Output JSON';

  public csvName = 'Yuma Output CSV';

  public keysArray: Array<string>;

  public allowOutput: false;

  ngOnInit(): void {
    this.keysArray$.subscribe(event => this.keysArray = event);
    this.download$.subscribe(event => this.download = event);
  }


  downloadArray(): void {
    this.store$.dispatch(new InsertDownloadAction());
  }

  saveToFile(): void {
    const outputJSON = this.download;
    const blob = new Blob([outputJSON], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, this.jsonName);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     let line = '';
     for (let index in headerList) {
      let head = headerList[index];
      line += array[i][head] + ',';
     }
     str += line;
     str = str.slice(0, -1);
     str = str + '\r\n';
    }
    return str;
   }

   saveToCSV() {
    let csvData = this.ConvertToCSV(this.download, this.keysArray);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.csvName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}


}
