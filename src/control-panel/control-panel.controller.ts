import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('control-panel')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
export class ControlPanelController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  public async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('users/:id')
  public async getUserById(@Param('id') id: string) {
    return await this.userService.findOneByID(id);
  }

  @Delete('users/:id')
  public async deleteUserById(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
