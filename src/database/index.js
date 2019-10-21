import Sequelize from "sequelize";
import Transacoes from '../app/models/Transacoes';
import databaseConfig from '../config/database';

const models = [Transacoes];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();