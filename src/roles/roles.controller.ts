// Импортируем необходимые декраторы и классы
// @nestjs/common содержит основные декораторы для работы с HTTP запросами
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// ToleService - это сервис, который содержит бизнес-логику по управлению ролями в бд
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';


// Декоратор, который указывает, что класс является контроллером, и все его маршруты будут начинаться с /roles
@Controller('roles')
export class RolesController {
    // В конструкторе инжектируем RolesService, что бы использовать его методы внтури контроллера. private означает, что метод будет доступен только внутри этого класса
    constructor(private roleService: RolesService){}

    // Декоратор, который говорит NestJS обрабатывать POST-запросы по адресу /roles
    @Post()
    // Метод create принимает данные из тела запроса и использует rolesService для создания новой роли
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    // Декоратор , котоырй говорит NesJS обрабатывать GET-запросы по адресу roles/:value, где :value это параметр, который извлекается из URL
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
