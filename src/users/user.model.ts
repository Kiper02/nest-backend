// Импорт декоратора ApiPropety, который используется для добавления метаданныз к свойствам модели, что позволяет Swagger автоматически генерировать документация API
import { ApiProperty } from "@nestjs/swagger";
// Декораторы для определения модели и ее связи
// BelongsToMany указывает на связь многие ко многим
// Column используется для определения столбца в таблице бд
// DataTypes содержит перечень типов данных, которые можно использовать в определении столбцов
// Model является базовым классом для всех моделей в Sequelize
// Table указывает, что класс должен быть связан с таблицей в бд
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
// Импорт других моделей, связанных с пользователем
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

// Интерфейс TS, который определяет атрибуты, необходимые для создания нового пользователя. Это поможет проверить, что мы передаем правильные данные при создании пользователя
interface UserCreationAttrs {
    email: string;
    password: string;
}

// Декоратор Table указывает что следующий класс должен быть связан с таблицей в бд. В данном случае с таблицей users
@Table({tableName: 'users'})
// Обьявляем класс User, который наследуется от базового класса Model. User представляет собой модель в нашем приложении, а UserCreationAttrs - это тип данных для атрибутов, которые используются при создании нового экземпляра модели
export class User extends Model<User, UserCreationAttrs>{
    // Декоратор ApiProperty используется для описания свойства модели в документации Swagger
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    // Декоратор Column определяет столбец в таблице 
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'komss184lkn123s', description: 'Пароль'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    password: string;
    
    @ApiProperty({example: 'true', description: 'Забанен пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    // Декоратор BelongsToMany указывает на связь многие ко многим между User и Role через промежуточную таблицу UserRoles
    @BelongsToMany(() => Role, () => UserRoles)
    // Свойство roles, которой будет содержать массив ролей, связанных с пользователем
    roles: Role[]
}