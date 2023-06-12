import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    title: string

    @Column({ nullable: true, type: "varchar" })
    content: string

    @Column({ default: false, type: "boolean" })
    published: boolean

    @ManyToOne((type) => User, (user) => user.posts, {
        // eager: true // autoload user to post
    })
    author: User
}