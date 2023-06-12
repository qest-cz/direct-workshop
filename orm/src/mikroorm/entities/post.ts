import {User} from "./user";
import {PrimaryKey, Property, Entity, ManyToOne} from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey({type: "int"})
    id: number

    @Property({type: "varchar"})
    title: string

    @Property({nullable: true, type: "varchar"})
    content: string

    @Property({default: false, type: "boolean"})
    published: boolean

    @ManyToOne(() => User, {
        eager: true, // autoload user to post
        name: 'authorId',
    })
    author: User
}