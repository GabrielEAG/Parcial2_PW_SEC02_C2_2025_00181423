const cuentas = require('../data/cuentas');

exports.getCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas,
  });
};

exports.getCuentaByQuery = (req, res) => {
  const { queryParam: query, isActive } = req.query;

  let resultados = cuentas;

  if (isActive !== undefined) {
    resultados = resultados.filter(c => c.isActive === (isActive === 'true'));
  }

  if (query) {
    const q = query.toLowerCase();
    resultados = resultados.filter(c =>
      c._id === query ||
      (c.client && c.client.toLowerCase().includes(q)) ||
      (c.gender && c.gender.toLowerCase() === q)
    );
  }

  if (resultados.length === 0) {
    return res.json({ finded: false });
  }

  if (resultados.length === 1) {
    return res.json({ finded: true, account: resultados[0] });
  }

  res.json({ finded: true, data: resultados });
};
