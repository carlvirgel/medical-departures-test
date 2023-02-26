import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/core/model/post';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() headers : any = [];
  private _dataTable: any = [];
  @Input() set dataTable(value: any) {
    this._dataTable = value;
    if(this._dataTable) {
      this._dataTable = this._dataTable.map((data: any )=> ({
        ...data,
        actions: {
          hasDelete: true,
          hasUpdate: true,
          hasView: true
        }
      }))
    }
  }
  
  get dataTable() {
    return this._dataTable;
  }

  @Output() onClickDelete = new EventEmitter<any>();
  @Output() onClickEdit = new EventEmitter<any>();
  @Output() onClickView = new EventEmitter<any>();

}



export interface TableData {
  id: number,
  title: any,
  actions: {
    hasDelete: boolean,
    hasUpdate: boolean
    hasView: boolean
  }
}