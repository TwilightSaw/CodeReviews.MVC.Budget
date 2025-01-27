using Budget.TwilightSaw.Models;
using Microsoft.EntityFrameworkCore;

namespace Budget.TwilightSaw.Data;

public class AppDbContext : DbContext
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>()
            .HasMany(c => c.Transactions) 
            .WithOne(t => t.Category) 
            .HasForeignKey(t => t.CategoryId); 

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Category) 
            .WithMany(c => c.Transactions) 
            .HasForeignKey(t => t.CategoryId);
    }

}