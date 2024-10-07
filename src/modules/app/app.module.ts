import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ColumnModule } from '../column/column.module';
import { CardModule } from '../card/card.module';
import { CommentModule } from '../comment/comment/comment.module';
import { AuthService } from "../auth/auth/auth.service";
import { AuthModule } from "../auth/auth/auth.module";

@Module({
  imports: [UserModule, ColumnModule, CardModule, CommentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
