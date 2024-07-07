// Импортруем главный класс nest с чего начинается вся разработка на этой технологии
import { NestFactory } from "@nestjs/core"
//  Импортруем главный модуль в котором будет собираться все остальные компоненты
import { AppModule } from "./app.module"
// Импортируем из допольнительной библиотеки два модуля, которые предназначены для документирования API
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

// Создаем асинхронную функцию в которой запускаем сервер
async function start() {
    // Создаем константу в которой будет хранится порт сервера
    const PORT = process.env.PORT || 5000
    // Создаем константу app, в ней будет хранится экземпляр приложения
    const app = await NestFactory.create(AppModule)
    // Согласно документации вызываем методы для размещения контента на странице документации
    const config = new DocumentBuilder()
        .setTitle('Урок по продвинотому BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Kirill Permyakov')
        .build()
        // Создаем обьект документа Swagger, который содержит всю документацию API приложения, в него передаем экземпляр приложения и обьект конфигурации Swagger
        const document = SwaggerModule.createDocument(app, config)
        // Настраиваем маршрут по которому будет доступна эта документация. По этому адресу будет пользовательский интерфейс Swagger, который отображает документация API, созданную на основе обьекта document
        SwaggerModule.setup('/api/docs', app, document)

    // Метод listen у экземпляра приложения прослушивает 5000 порт
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

// Вызов стартовой функции
start()