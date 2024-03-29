using devicesController.Services;
using Grpc.Core;
using GrpcService1;
using System.IO.Ports;

namespace GrpcService1.Services
{
    public class HalService : Hal.HalBase
    {
        static SerialComunicationService scc = SerialComunicationService.Instance;
        static CartService cs = CartService.Instance;

        public override Task<HalResponse> LIGHTon(HalLightState request, ServerCallContext context)
        {
            scc.WriteToSerial("turn on");
            var response = new HalResponse{ Message = "the light is turned on" };

            return Task.FromResult(response);
        }

        public override Task<HalResponse> LIGHToff(HalLightState request, ServerCallContext context)
        {
            scc.WriteToSerial("turn off");
            var response = new HalResponse { Message = "the light is turned off" };

            return Task.FromResult(response);
        }

        public override Task<HalResponse> CartDeliver(empty request, ServerCallContext context)
        {
            cs.deliverCart();
            var response = new HalResponse { Message = "the cart is being delivered" };

            return Task.FromResult(response);
        }

        public override Task<HalResponse> CartReturn(empty request , ServerCallContext context)
        {
            cs.returnCart();
            var response = new HalResponse { Message = "the cart is being returned" };

            return Task.FromResult(response);
        }

    }
}
