import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { NoteModule } from './note/note.module';

@Module({
  imports: [ConfigModule.forRoot(), NoteModule],
  controllers: [AppController],
})
export class AppModule {}
