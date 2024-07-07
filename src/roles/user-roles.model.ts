// Определение модели связной таблицы между users и roles

// Column и Table для аннотации и определения структуры таблицы бд
// DataTypes определяет типы данных для столбцов
// ForeignKey указывает на внешний ключ, который связывает две таблицы
// Model является базовых классом для всех моделей в Sequelize
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
// Импорт моделей, которые связаны с таблицей user_roles
import { User } from "src/users/user.model";
import { Role } from "./roles.model";


// Декоратор Table импользуется для указания Sequelize, что следующий класс должен быть связан с таблицей в бд
// tableName задает имя таблицы. createdAt и updatedAt параметры которые отключают автоматическое добавление этих столбцов в таблицу
@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
// Обьявление класса UserRoles, который наследуется от базового класса Model. Это означает, что UserRoles будет использовать функциональность и структуру, предоставляемую базовым классом Model
export class UserRoles extends Model<UserRoles>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // ForeignKey - указаывает что это поле является внешним ключом, ссылющимся на модель Role
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    userId: number;
}