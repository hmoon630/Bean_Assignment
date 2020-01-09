import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    public id: string;

    @Column
    public password: string;
}
