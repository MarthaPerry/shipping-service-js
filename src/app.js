const express = require('express')
const app = express()
const ShippingController = require('/Users/marthape@uk.ibm.com/Documents/CloudNative/shipping-service/tests/src/controllers/shipping-controller.js')

app.get('/shipping', (request, response) => {
  let ctrl = new ShippingController()

  ctrl
    .getItemShipping({id: request.query.itemId, type: request.query.type})
    .then(amount => {
      response.send({ itemId: request.query.itemId, amount: amount })
    })
    .catch(error => {
      response.status(500).send({ error: error.message })
    })
})
let PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`ShippingService is listening on port ${PORT}`))