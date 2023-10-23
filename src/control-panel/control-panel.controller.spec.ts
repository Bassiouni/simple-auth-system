import { Test, TestingModule } from '@nestjs/testing';
import { ControlPanelController } from './control-panel.controller';

describe('ControlPanelController', () => {
  let controller: ControlPanelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlPanelController],
    }).compile();

    controller = module.get<ControlPanelController>(ControlPanelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
