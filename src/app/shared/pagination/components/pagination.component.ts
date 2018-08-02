import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs'
import { PageResponse } from '../models/pagination';

@Component({
  selector: 'app-paginator',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() page: PageResponse<any>;
  @Output() pageChange = new EventEmitter<number>();
}