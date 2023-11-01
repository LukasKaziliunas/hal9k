using GrpcService1.Services;
using System.Net;

var conf = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

String ip = conf.GetSection("env")["ip"];
int port = int.Parse(conf.GetSection("env")["port"]);

var builder = WebApplication.CreateBuilder(args);
SerialComunicationService scc = SerialComunicationService.Instance;
scc.OpenPort();

builder.WebHost.ConfigureKestrel(options =>
{
   options.Listen(IPAddress.Parse(ip), port);
});

builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<HalService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();


//clean up, close serial port 
AppDomain.CurrentDomain.ProcessExit += (sender, e) =>
{
    app.DisposeAsync();
    SerialComunicationService scc = SerialComunicationService.Instance;
    scc.ClosePort();
    Console.WriteLine("shutting down, bye");
};
