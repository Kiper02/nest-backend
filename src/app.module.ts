// Импортируем декоратор для создания модуля
import { Module } from "@nestjs/common";
// Импорт ОРМ
import { SequelizeModule } from "@nestjs/sequelize";
// Импорт модуля user
import { UsersModule } from './users/users.module';
// Импорт пакета конфигурации для управления dotenv
import { ConfigModule } from "@nestjs/config";
// Импорт модели User
import { User } from "./users/user.model";
// Импорт Модуля RolesModule
import { RolesModule } from './roles/roles.module';
// Импорт модели Role
import { Role } from "./roles/roles.model";
// Ипорт связной модели для User и Role 
import { UserRoles } from "./roles/user-roles.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        // ConfigModule обнажает ConfigService, который загружает соответсвующий .env файл
        // forRoot статический метод, который регистрирует ConfigService провайдер, который предоставляет get() метод для чтения проанализированных/обьедененных переменных конфигурации
        ConfigModule.forRoot({
            // Путь для файла конфигурации будет зависеть от того какой скрипт запустить(для разработки или для продакшина)
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        // Метод forRoot обьекта SequelizeModule принимает все свойства конфигурации
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            models: [User, Role, UserRoles],
            autoLoadModels: true
          }),
        //   Так как это основной модуль, сюда необходимо импортировать остальные
        UsersModule,
        RolesModule,
    ]
})
// Экспортируем готовый модуль
export class AppModule {}