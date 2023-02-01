using MultiUserCrossword.Hubs.Crossword;
using Puzzle.JsonSerializers;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("ClientPermission");

app.MapHub<CrosswordHub>("/hubs/crossword");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();


static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    services.AddControllers().AddNewtonsoftJson();

    // from https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6
    services.AddCors(options =>
    {
        options.AddPolicy("ClientPermission", policy =>
        {
            policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("https://localhost:44408", "https://localhost:7177")
            .AllowCredentials();
        });
    });
    services
        .AddSignalR()
        .AddJsonProtocol();
}