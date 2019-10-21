import { Sequelize, Model } from 'sequelize';

class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        currency_id: Sequelize.STRING,
        description: Sequelize.STRING,
        tipo_pagamento: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        idempotency: Sequelize.STRING,
        status: Sequelize.STRING,
        status_detail: Sequelize.STRING,
        transaction_amount: Sequelize.INTEGER,
      },
      {
        sequelize, 
      }
    );
  }
}

export default Transacoes;