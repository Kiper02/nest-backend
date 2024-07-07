// Импорт декоратора Module
import { Module } from '@nestjs/common';
// Импорт модуля UserContoller, управляющий входящими запросами, связанные с пользователями
import { UsersController } from './users.controller';
// Импорт модуля UserService, который содержит бизнес-логику приложения, такую как взаимодействие с базой данных для управления пользователями
import { UsersService } from './users.service';
// Импорт модуля sequelize orm 
import { SequelizeModule } from '@nestjs/sequelize';
// Импорт модели User
import { User } from './user.model';
// Импорт модели Role
import { Role } from 'src/roles/roles.model';
// Импорт связной модели UserRoles 
import { UserRoles } from 'src/roles/user-roles.model';

// Декоратор, который обьявляет класс ниже как модуль(в контексте nestjs)
@Module({
  // В свойстве contollers указывается массив контроллеров , которые будут включены в модуль. Они отвечают за обработку входящих запросов
  controllers: [UsersController],
  // провайдер это массив сервисов, которые будут доступны для иньекции в другие класса в рамках модуля
  providers: [UsersService],
  // imports это массив других модулей котрые необходимы для текущего модуля
  imports: [
    // Регистрирует модели, которые будут использоваться в рамках модуля, позволяя впоследствии инжектировать их в сервисы
    SequelizeModule.forFeature([User, Role, UserRoles])
  ]
})
// Экспорт модуля
export class UsersModule {}
