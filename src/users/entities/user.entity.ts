import { Column, CreateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity('user')
export class User {
  @Column({type:'bigint', width:20, unsigned:true, primary:true, generated:true})
  id: number;
  @Column({type:'varchar', length:250, nullable:false})
  name: string;
  @Column({type:'varchar', length:250, nullable:false})
  surname: string;
  @Column({type:'varchar', length:250, nullable:false, unique:true})
  email: string;
  @Column({type:'varchar', length:250, nullable:false})
  password: string;
  @Column({type:'varchar', length:35, nullable:false, default:'admin'})
  role: string;

  @CreateDateColumn({name:'created_at', type: 'timestamp', precision:6, default: () => 'CURRENT_TIMESTAMP(6)'})
  createdAt: Date;
  @CreateDateColumn({name:'updated_at', type: 'timestamp', precision:6, default: () => 'CURRENT_TIMESTAMP(6)'})
  updatedAt: Date;
  @DeleteDateColumn({name:'deleted_at', type: 'timestamp'})
  deletedAt: Date;
}
