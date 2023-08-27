using LibraryApi.Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace LibraryApi.Infrastructure.src.Database;

public class DatabaseContext : DbContext
{
  private readonly IConfiguration _config;
  public DbSet<User> Users { get; set; }
  public DbSet<Book> Books { get; set; }
  public DbSet<Loan> Loans { get; set; }
  public DbSet<Author> Authors { get; set; }

  public DatabaseContext(DbContextOptions options, IConfiguration config) : base(options)
  {
    _config = config;
  }

  static DatabaseContext()
  {
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
  }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
    builder.MapEnum<Role>();
    builder.MapEnum<Genre>();
    optionsBuilder.AddInterceptors(new TimestampInterceptor());
    optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.HasPostgresEnum<Role>();
    modelBuilder.HasPostgresEnum<Genre>();
    modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
/*     modelBuilder.Entity<Book>()
      .HasOne(b => b.Author)
      .WithMany(a => a.Books)
      .HasForeignKey(b => b.AuthorId)
      .IsRequired(); */
  }
}
