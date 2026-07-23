import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";
@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
    @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  datetime!: string;

  @Column()
  location!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @Column()
  photo!: string;



}