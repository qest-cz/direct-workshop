import {PrismaClient, User, Post} from "@prisma/client";

export class PrismaService {
    constructor(private readonly client: PrismaClient) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.client.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    async getAllPosts(): Promise<Post[]> {
        return this.client.post.findMany({
            include: {
                // I need to say I want author true
                author: true,
            }
        });
    }

    async getPostsList(): Promise<{
        title: string,
        author: {
            name: string,
        }
    }[]> {
        const posts = await this.client.post.findMany({
            select: {
                title: true,
                author: {
                    // I select only some property from selected
                    select: {
                        name: true
                    }
                }
            },
        });

        return posts;
    }

}