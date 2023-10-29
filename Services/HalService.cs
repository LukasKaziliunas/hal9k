using Grpc.Core;
using GrpcService1;
using System.IO.Ports;

namespace GrpcService1.Services
{
    public class HalService : Hal.HalBase
    {
        static SerialComunicationService scc = SerialComunicationService.Instance;

        public override Task<HalResponse> LEDon(HalLedState request, ServerCallContext context)
        {
            scc.WriteToSerial("turn on");
            var response = new HalResponse{ Message = "the led is turned on" };

            return Task.FromResult(response);
        }

        public override Task<HalResponse> LEDoff(HalLedState request, ServerCallContext context)
        {
            scc.WriteToSerial("turn off");
            var response = new HalResponse { Message = "the led is turned off" };

            return Task.FromResult(response);
        }
    }
}
