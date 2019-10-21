import Transacoes from '../models/Transacoes';
import mercadopago from 'mercadopago';

class TransacoesController {  
  async create(req, res) {

    mercadopago.configurations.setAccessToken(config.access_token);

    var payment_data = {
      transaction_amount: req.body.transaction_amount,
      token: req.body.token,
      description: req.body.description,
      installments: req.body.installments,
      payment_method_id: req.body.tipo_pagamento,
      payer: {
        email: req.body.email
      }
    };
    
    mercadopago.payment.save(payment_data).then(function (data) {
      var transacao = {
        currency_id: req.body.token,
        description: req.body.description,
        tipo_pagamento: req.body.tipo_pagamento,
        email: req.body.email,
        cpf_cnpj: req.body.cpf_cnpj,
        idempotency: Sequelize.STRING,
        status: data.status,
        status_detail: data.status_detail,
        transaction_amount: req.body.transaction_amount,

      };
    }).catch(function (error) {
      return res.json(error);
    });

    const transacoes = await Transacoes.create(req.body);
    return res.json(transacoes);
  }

  async search(req, res) {
    const transacoes = await Transacoes.findAll();
    return res.json(transacoes);
  }

}

export default new TransacoesController();