using System.IO.Ports;

namespace GrpcService1.Services
{
    public class SerialComunicationService
    {

        private static volatile SerialComunicationService instance;

        private String portName = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("env")["SerialPortName"];
        private SerialPort sp { get; set; }
        private bool opened;

        private SerialComunicationService()
        {

            sp = new(portName, 9600)
            {
                DataBits = 8,
                Parity = Parity.None,
                StopBits = StopBits.One,
                WriteTimeout = TimeSpan.FromSeconds(3).Seconds,
                ReadTimeout = TimeSpan.FromMilliseconds(1000).Seconds
            };
        }

        //create/retrieve sigleton
        public static SerialComunicationService Instance
        {
            get
            {
                if (instance != null) return instance;

                    if (instance == null)
                    {
                        instance = new SerialComunicationService();
                    }
                
                return instance;
            }
        }

        public int WriteToSerial(String message)
        {
            if (opened)
            {
                try
                {
                    sp.WriteLine(message);
                    return 0;
                }
                catch (Exception) { return 1; }
            }
            return 0;
        }

        public void ClosePort()
        {
            if (opened)
            {
                opened = false;
                sp.Close();
            }
           
        }

        public void OpenPort()
        {
            if (!opened)
            {
                sp.Open();
                opened = true;
            }
        }

        public String ReadFromSerial()
        {
            if (opened)
            {
                string message = sp.ReadLine();
                Console.WriteLine(message);
                return message;
            }
            return "";
        }

    }
}
