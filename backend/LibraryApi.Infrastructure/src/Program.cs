using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using LibraryApi.Infrastructure.src.RepoImplementations;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Implementations;
using LibraryApi.Service.src.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using JWT.Algorithms;
using JWT.Builder;
using JWT.Extensions.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddDbContext<DatabaseContext>();

builder.Services.AddCors(opts => 
{
    opts.AddDefaultPolicy(builder => 
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services
.AddScoped<IUserRepo, UserRepo>()
.AddScoped<IUserService, UserService>()
.AddScoped<IBookRepo, BookRepo>()
.AddScoped<IBookService, BookService>()
.AddScoped<IAuthorRepo, AuthorRepo>()
.AddScoped<IAuthorService, AuthorService>()
.AddScoped<ILoanRepo, LoanRepo>()
.AddScoped<ILoanService, LoanService>()
.AddScoped<IAuthService, AuthService>()
;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme{
        Description = "Bearer token authentication",
        Name = "Authentication",
        In = ParameterLocation.Header,
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services
.AddAuthentication(JwtAuthenticationDefaults.AuthenticationScheme)
.AddJwt(
    options => options.Keys = new[] { "my-secret-key" }
);

builder.Services.AddSingleton<IAlgorithmFactory>(new HMACSHAAlgorithmFactory());

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
//app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
