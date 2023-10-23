import { Module } from '@nestjs/common';
import { ControlPanelController } from './control-panel.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ControlPanelController],
})
export class ControlPanelModule {}
