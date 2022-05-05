import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TagDto } from 'src/dto/tag.dto';
import { tagsArr } from 'src/db/tags.db';
import { getResponse, Response } from 'src/utils/httpResponse';
import { hashTags } from 'src/utils/regex';

@Injectable()
export class TagService {
  private sortCb(a: TagDto, b: TagDto) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }

  async getTags(): Promise<Response<TagDto[]>> {
    return getResponse<TagDto[]>(tagsArr.sort(this.sortCb));
  }

  async getTagsFromText(text: string): Promise<string[]> {
    const matches: string[] = [];
    let match: RegExpExecArray;

    while ((match = hashTags.exec(text))) {
      matches.push(match[1]);
    }

    return matches;
  }

  async addTags(values: string[]): Promise<void> {
    values
      .filter((v) => tagsArr.findIndex((tag) =>
        tag.value.replace('#', '') === v) === -1)
      .forEach((v) => {
        tagsArr.push({
          id: uuidv4(),
          value: `#${v}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
  }
}
