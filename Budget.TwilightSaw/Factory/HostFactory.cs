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

        services.AddControllersWithViews();
        services.AddRouting();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddScoped<DbContext, AppDbContext>();
        services.AddScoped<IRepository<Models.Category>, Repository<Models.Category>>();
        services.AddScoped<IRepository<Models.Transaction>, Repository<Models.Transaction>>();
        services.AddScoped<CategoryService>();
        services.AddScoped<TransactionService>();
     
        return builder.Build();
    }
}