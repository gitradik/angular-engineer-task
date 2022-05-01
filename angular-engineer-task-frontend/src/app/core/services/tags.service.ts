import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private tags = new BehaviorSubject<Tag[]>([]);
  private selectedTag = new BehaviorSubject<Tag | null>(null);

  get tags$(): Observable<Tag[]> {
    return this.tags.asObservable();
  }
  get selectedTag$(): Observable<Tag | null> {
    return this.selectedTag.asObservable();
  }

  constructor(override http: HttpClient) {
    super(http);
  }

  fetchTags(value?: string) {
    this.get<Tag[]>(this.url, { tagValue: value || '' }).subscribe((result) =>
      this.tags.next(result.data)
    );
  }

  setSelectedTag(id: string | null) {
    const tag = this.tags.getValue().find((t) => t.id === id);

    if (tag) {
      this.selectedTag.next(this.selectedTag.value?.id === id ? null : tag);
    }
  }
}
