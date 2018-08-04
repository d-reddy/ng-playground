import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { PageResponse } from '../models/pagination';

@Component({
  selector: 'app-paginator',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit{
  @Input() page: PageResponse<any>;
  @Output() pageChange = new EventEmitter<number>();

  lastPage:number; 
  numPages:number;

  constructor(){}

  ngOnInit(){
    if (this.page){
      this.numPages = Math.ceil(this.page.total / this.page.pageSize);
      this.lastPage = this.numPages - 1;
    }
  }

  onNextClick(index:number){
    if(index < this.lastPage){
      this.pageChange.emit(++index);
    }
  }

  onPrevClick(index:number){
    if(index > 0){
      this.pageChange.emit(--index);
    }
  }

  onClick(index:number){
    this.pageChange.emit(index);
  }
}