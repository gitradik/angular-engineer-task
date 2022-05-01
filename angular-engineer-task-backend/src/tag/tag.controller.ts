import { Controller, Get } from '@nestjs/common';
import { TagDto } from 'src/dto/tag.dto';
import { TagService } from './tag.service';
import { Response } from 'src/utils/httpResponse';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  getAll(): Promise<Response<TagDto[]>> {
    return this.tagService.getTags();
  }
}
