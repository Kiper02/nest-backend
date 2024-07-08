// Декратор который помечает класс как сервис, который можно внедрить как зависимость в другие классы через механизм внедрения зависимостей NestJS
import { Injectable } from '@nestjs/common';
// Импорт DTO(Data Transfer Object) используется для инкапсулцици данных и определения того, как данные будут передаваться по сети. В данном случае там будут содержаться данные, необходимые для создания роли
import { CreateRoleDto } from './dto/create-role.dto';
// Декоратор, который позволяет внедрить модель Sequelize в класс. Это упрощает доступ к методам модели для взаимодействия с бд
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

// Декоратор указывает что класс RolesService является сервисом и может быть внедрен как зависимость
@Injectable()
// Обьявляется класс RolesService, который будет содержать бизнес-логику, связанную с ролями в приложении
export class RolesService {
    // Конструктор класса, который использует декоратор @InjectModel для внедрения модели Role. private обьявляет приватное свйоство role Repositoty, которое будет использоваться для доступа к методам модели Role
    constructor(@InjectModel(Role) private roleRepository: typeof Role){}
    // Метод для создания роли, принимает обьект CreateRoleDto и использует roleRepository для создания новой записи в таблице ролей
    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }
    // Метод для получение роли по ее значению, принимает строковое значение 
    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }
}
