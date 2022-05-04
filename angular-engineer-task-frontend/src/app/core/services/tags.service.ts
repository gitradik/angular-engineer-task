import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseAPIService } from './api/base-api-service.class';

export interface Tag {
  id: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TagsService extends BaseAPIService {
  private readonly url = 'tags';
  override errorMessage: string = 'Tags error';

  constructor(override http: HttpClient) {
    super(http);
  }

  fetchTags(): Observable<Tag[]> {
    return this.get<Tag[]>(this.url).pipe(map((response) => response.data));
  }
}
