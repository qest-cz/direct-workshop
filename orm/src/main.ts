import "reflect-metadata"

import express from 'express';
import {PrismaService} from "./prisma/PrismaService";
import {PrismaClient} from "@prisma/client";
import {DataSource} from "typeorm";
import {User} from "./typeorm/entities/user";
import {Post} from "./typeorm/entities/post";

import {User as MikroUser} from "./mikroorm/entities/user";
import {Post as MikroPost} from "./mikroorm/entities/post";
import {TypeOrmService} from "./typeorm/TypeOrmService";
import {MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";
import {MikroOrmService} from "./mikroorm/MikroOrmService";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const prismaClient = new PrismaClient();

const typeOrmDataSource = new DataSource({
    type: "sqlite",
    database: "./orm/db/db.sqlite",
    // synchronize: true,
    entities: [User, Post],
});

const main = async () => {
    await typeOrmDataSource.initialize();

    const mikroOrm = await MikroORM.init<SqliteDriver>({
        type: 'sqlite',
        entities: [MikroUser, MikroPost],
        dbName: './orm/db/db.sqlite',
        allowGlobalContext: true,
    });

    // const service = new PrismaService(prismaClient);
    const service = new TypeOrmService(typeOrmDataSource);
    // const service = new MikroOrmService(mikroOrm);


    app.get('/users', async (_, res, next) => {
        try {
            const posts = await service.getAllUsers();

            res.send({posts});
        } catch (e) {
            next(e);
        }

    });

    app.get('/posts', async (_, res, next) => {
        try {
            const posts = await service.getAllPosts();

            res.send({posts});
        } catch (e) {
            next(e);
        }
    });

    app.get('/posts/simple', async (_, res, next) => {
        try {
            const posts = await service.getPostsList();

            res.send({posts});
        } catch (e) {
            next(e);
        }
    });


    app.listen(port, host, () => {
        console.log(`[ ready ] http://${host}:${port}`);
    });
}

main().catch(console.error);
