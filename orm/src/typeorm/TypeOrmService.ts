import {DataSource} from "typeorm";
import {User} from "./entities/user";
import {Post} from "./entities/post";

export class TypeOrmService {
    constructor(private readonly client: DataSource) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.client.getRepository(User).find({
            relations: { posts: true },
            // relations: ['posts']
            // relations: ['mistake']
        });
    }

    async getAllPosts(): Promise<Post[]> {
        return this.client.getRepository(Post).find({
            // but authors are loaded by eager option, I don't need to specify relation
        });
    }

    async getPostsList(): Promise<{
        title: string,
        author: {
            name: string,
        }
    }[]> {
        const posts = await this.client.getRepository(Post).find({
            select: {
                title: true,
                author: {
                    // I select only name, but eager give whole author
                    name: true
                }
            },
        });

        // why have post content even if I don't select it
        // posts[0].content.length;

        return posts;
    }
}