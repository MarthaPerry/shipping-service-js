var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var ShippingController = require('/Users/marthape@uk.ibm.com/Documents/CloudNative/shipping-service/tests/src/controllers/shipping-controller.js')
var productService = require('/Users/marthape@uk.ibm.com/Documents/CloudNative/shipping-service/tests/src/services/product-service.js')

describe('Shipping controller', function () {
  var shippingCtrl = new ShippingController()

  beforeEach(function(){
    sinon.stub(productService, 'getProductWeight').callsFake(async function() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(5)
        }, 50)
      })
    })
  })

  afterEach(function () {
    productService.getProductWeight.restore()
  })

  it('Should calculate correct shipping ', async function () {
    let shipping = await shippingCtrl.getItemShipping({ id: 1, type: 'standard' })
    expect(shipping).to.equal(0.5)
  })  
  it('Should calculate correct overnight shipping ', async function () {
    let shipping = await shippingCtrl.getItemShipping({ id: 1, type: 'overnight' })
    expect(shipping).to.equal(5)
  })


})
