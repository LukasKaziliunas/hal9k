const pd = require('./protoDescriptor').protoDescriptor
var grpc = require('@grpc/grpc-js');
require('dotenv').config()

class HalDeviceManager {

    constructor() {
        let hal = pd.hal;
        this.client = new hal.Hal(process.env.GRPC_SERVER_ADDRESS, grpc.credentials.createInsecure())
    }

    lightOn() {
        let halState = {
            "state": 1
        }

        return new Promise((resolve, reject) => {
            this.client.LIGHTOn(halState, (err, data) => {
                if (err) {console.log(err); reject("there was en error while turning the ligh on")}
                resolve(data);
            })
        })
    }

    lightOff() {
        let halState = {
            "state": 1
        }

        return new Promise((resolve, reject) => {
            this.client.LIGHTOff(halState, (err, data) => {
                if (err) {console.log(err); reject("there was en error while turning the ligh off")}
                resolve(data);
            })
        })
    }

    CartDeliver() {
        let empty = {
           
        }

        return new Promise((resolve, reject) => {
            this.client.CartDeliver(empty, (err, data) => {
                if (err) {console.log(err); reject("there was en error performing this action")}
                resolve(data);
            })
        })
    }

    CartReturn() {
        let empty = {
           
        }

        return new Promise((resolve, reject) => {
            this.client.CartReturn(empty, (err, data) => {
                if (err) {console.log(err); reject("there was en error performing this action")}
                resolve(data);
            })
        })
    }

}

exports.HalDeviceManager = HalDeviceManager