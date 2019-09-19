const method = (req, res) => res.status(405).send({
  status: 405,
  message: 'method not allowed'
});

export default method;
