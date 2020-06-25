import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "System.Reference" })
export class Reference extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  ReferenceId!: number;

  @Column()
  ItemDescription!: string;
}
