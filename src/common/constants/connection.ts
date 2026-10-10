export const connection: Connection = {
  CONNECTION_STRING: 'MYSQL://1234/sad',
  DB: 'MYSQL',
  DBNAME: 'NETS_TEST'
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string
};