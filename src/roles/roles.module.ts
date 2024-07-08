import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/user.model';
import { UserRoles } from './user-roles.model';

// Декоратор Module применяется к классу ниже и определяет метаданные модуля
@Module({
  // В провайдеры добавляется RolesService, что делает его доступным для иньекций зависимостей в пределах этого модуля
  providers: [RolesService],
  // В массив контроллеров добавляется RolesController, что позволяет NestJS регистрировать маршруты, определенные в этом контроллере
  controllers: [RolesController],
  imports: [
    // Регистрация моделей. Это позволяет использовать их в пределах этого модуля
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
