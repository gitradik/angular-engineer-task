import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { NoteModule } from './note/note.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [ConfigModule.forRoot(), NoteModule, TagModule],
  controllers: [AppController],
})
export class AppModule {}
