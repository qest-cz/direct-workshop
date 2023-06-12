import {PrimaryKey, Property, Entity, OneToMany, Collection} from "@mikro-orm/core";
import {Post} from "./post";

@Entity()
export class User {
    @PrimaryKey({type: "int"})
    id: number

    @Property({ nullable: true, type: "varchar" })
    name: string

    @Property({ unique: true, type: "varchar" })
    email: string

    @OneToMany((type) => Post, (post) => post.author, )
    posts = new Collection<Post>(this);
}

