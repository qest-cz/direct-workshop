import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, type: "varchar" })
    name: string

    @Column({ unique: true, type: "varchar" })
    email: string

    @OneToMany((type) => Post, (post) => post.author)
    posts: Post[]
}