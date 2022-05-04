import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TagsService } from '@app/core/services/tags.service';
import * as TagsActions from './tags.actions';

@Injectable()
export class TagsEffects {
  constructor(private actions: Actions, private tagsService: TagsService) {}

  fetchTags$ = createEffect(() =>
    this.actions.pipe(
      ofType(TagsActions.ActionTypes.FetchTagsBegin),
      switchMap(() => {
        return this.tagsService.fetchTags().pipe(
          map((data) => new TagsActions.FetchTagsSuccess({ data })),
          catchError((error) => of(new TagsActions.FetchTagsFailure({ error })))
        );
      })
    )
  );
}
