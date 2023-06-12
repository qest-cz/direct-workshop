import {DataSource} from "typeorm";
import {User} from "./entities/user";
import {Post} from "./entities/post";
import {MikroORM} from "@mikro-orm/core";

export class MikroOrmService {
    constructor(private readonly client: MikroORM) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.client.em.getRepository(User).findAll({
            populate: ['posts'],
        });
    }

    async getAllPosts(): Promise<Post[]> {
        return this.client.em.getRepository(Post).findAll({
            // but authors are loaded by eager option, I don't need to specify relation
        });
    }

    async getPostsList(): Promise<{
        title: string,
        author: {
            name: string,
        }
    }[]> {
        const posts = await this.client.em.getRepository(Post).findAll({
            fields: ['title', 'author.name'],
            populate: ['author'],
        });

        // why have post content even if I don't select it
        // posts[0].content.length;

        return posts;
    }
}