using Budget.TwilightSaw.Data;
using Budget.TwilightSaw.Repository;
using Budget.TwilightSaw.Service;
using Microsoft.EntityFrameworkCore;

namespace Budget.TwilightSaw.Factory;

public class HostFactory
{
    public static WebApplication CreateWebApplication(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;

        var services = builder.Services;

        services.AddDbContext<AppDbContext>(options => options
            .UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
            .LogTo(Console.WriteLine, LogLevel.None)
            .UseLazyLoadingProxies());

        services.AddControllersWithViews().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        }); ;
        services.AddRouting();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddScoped<DbContext, AppDbContext>();
        services.AddScoped<IRepository<Models.Category>, Repository<Models.Category>>();
        services.AddScoped<IRepository<Models.Transaction>, Repository<Models.Transaction>>();
        services.AddScoped<CategoryService>();
        services.AddScoped<TransactionService>();
        
        services.AddCors(options =>
        {
            options.AddPolicy(name: "_myAllowSpecificOrigins",
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "https://localhost:3000") // Дозволяємо React
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        return builder.Build();
    }
}