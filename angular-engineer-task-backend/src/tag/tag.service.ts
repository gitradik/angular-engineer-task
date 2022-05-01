import { Injectable } from '@nestjs/common';
import { TagDto } from 'src/dto/tag.dto';
import { tagsArr } from 'src/db/tags.db';
import { getResponse, Response } from 'src/utils/httpResponse';

@Injectable()
export class TagService {
  private sortCb(a: TagDto, b: TagDto) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }

  async getTags(): Promise<Response<TagDto[]>> {
    return Promise.resolve(getResponse<TagDto[]>(tagsArr.sort(this.sortCb)));
  }
}
