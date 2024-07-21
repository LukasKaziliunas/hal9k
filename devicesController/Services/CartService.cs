using GrpcService1;
using GrpcService1.Services;

namespace devicesController.Services
{
    public class CartService
    {
        static SerialComunicationService scc = SerialComunicationService.Instance;

        private static volatile CartService instance;
        private bool locked = false;
        private String position = "home";

        private String cartDeliverScript;
        private String cartReturnScript;


        private CartService()
        {
            var conf = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            cartDeliverScript = conf.GetSection("env")["cartDeliverScript"];
            cartReturnScript = conf.GetSection("env")["cartReturnScript"];

        }

        //create/retrieve sigleton
        public static CartService Instance
        {
            get
            {
                if (instance != null) return instance;

                if (instance == null)
                {
                    instance = new CartService();
                }

                return instance;
            }
        }

        public void deliverCart()
        {
            if (!locked)
            { 
                locked = true;
                deliverCartTask();
            }
        }

        public void returnCart()
        {
            if (!locked)
            {
                locked = true;
                returnCartTask();
            }
        }

        private async Task<int> deliverCartTask() 
        {
            String[] commands = cartDeliverScript.Split(';');

            foreach (String command in commands)
            {
                int time = int.Parse(command.Split('-')[1]);
                scc.WriteToSerial(command);
                await Task.Delay( (1 + time) * 1000 );
            }
            /*
            scc.WriteToSerial("CART:F-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:FL-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:FR-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:F-3");
            */
            await Task.Delay(5000);
            position = "B";
            locked = false;
            return 0;
        }

        private async Task<int> returnCartTask()
        {
            String[] commands = cartReturnScript.Split(';');

            foreach (String command in commands)
            {
                int time = int.Parse(command.Split('-')[1]);
                scc.WriteToSerial(command);
                await Task.Delay((1 + time) * 1000);
            }
            /*
            scc.WriteToSerial("CART:BR-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:FL-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:BR-1");
            await Task.Delay(3000);
            scc.WriteToSerial("CART:F-3");
            */
            await Task.Delay(5000);
            position = "home";
            locked = false;
            return 0;
        }

    }
}
