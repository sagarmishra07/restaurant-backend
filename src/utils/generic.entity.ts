import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
