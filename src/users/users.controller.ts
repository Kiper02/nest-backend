// Импорт модулей, каждый описан ниже
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// класс DTO который определяет структуру данных, ожидаемых в теле POST запроса для создания пользователя
import { CreateUserDto } from './dto/create-user.dto';
// Сервис, который содержит бизнес-логику, связанную с пользователями, например создание новых пользователей и получение всех пользоватей
import { UsersService } from './users.service';
// Эти импорты используются для добавления метаданных к  API, что помогает а автоматическое генерации документации Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// Импорт модели User
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth-decorators';

// Декоратор для обьеденения всех операций на странице документации
@ApiTags('Пользователи')
//  Декоратор Controller определяет базовый путь для всех методов в этом контроллере. В данном случае, все маршруты будут начинаться с /users
@Controller('users')
// Обьявляем класс, который будет обрабатывать все запросы, связанные с пользователями
export class UsersController {
    // Конструктор класса, который инжектирует(внедряется) сервис UsersService, делая его доступным в методахконтроллера
    constructor(private userService: UsersService) {}
    // Декоратор который добвлаяет описание операции на странице документации
    @ApiOperation({summary: 'Создание пользователя'})
    // Декоратор описывает возможный ответ сервера
    @ApiResponse({status: 200, type: User})
    // Декоратор указывает, что следующий метод будет обрабатывать POST-запросы
    @Post()
    // Метод create. Декоратор Body извлекает тело запроса и преобразует его в обьект, указанный в параметре метода
    create(@Body() userDto: CreateUserDto) {
        // На выходе возвращаем результат работы метода createUser обьекта useService, в него передаем тело запроса
        return this.userService.createUser(userDto)
    }
    // Декоратор который добвлаяет описание операции на странице документации
    @ApiOperation({summary: 'Получение всех пользователей'})
    // Декоатор описывает возможный ответ сервера
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN')
    // Декоратор указыват, что следующий метод будет обрабатывать GET-запросы
    @Get()
    // Функция для получения всех пользователей
    getAll() {
        // Возвращаем результат работы метода getAllUsers обьекта userService
        return this.userService.getAllUsers()
    }
}
