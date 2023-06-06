import "reflect-metadata"

import express from 'express';
import {PrismaService} from "./prisma/PrismaService";
import {PrismaClient} from "@prisma/client";
import {DataSource} from "typeorm";
import {User} from "./typeorm/entities/user";
import {Post} from "./typeorm/entities/post";
import {TypeOrmService} from "./typeorm/TypeOrmService";

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

// const service = new PrismaService(prismaClient);
const service = new TypeOrmService(typeOrmDataSource);


const main = async () => {
    await typeOrmDataSource.initialize();

    app.get('/users', async (_, res) => {
        const posts = await service.getAllUsers();

        res.send({posts});
    });

    app.get('/posts', async (_, res) => {
        const posts = await service.getAllPosts();

        res.send({posts});
    });

    app.get('/posts/simple', async (_, res) => {
        const posts = await service.getPostsList();

        res.send({posts});
    });


    app.listen(port, host, () => {
        console.log(`[ ready ] http://${host}:${port}`);
    });
}

main().catch(console.error);
