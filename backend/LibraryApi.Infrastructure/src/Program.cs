using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Infrastructure.src.Database;
using LibraryApi.Infrastructure.src.RepoImplementations;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Implementations;
using LibraryApi.Service.src.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LibraryApi.Infrastructure.src.AuthorizationRequirements;
using Npgsql;
using LibraryApi.Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using LibraryApi.Infrastructure.src.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services
.AddSingleton<ErrorHandlerMiddleware>();

var connectionString = builder.Configuration.GetConnectionString("Default");

var npgsqlBuilder = new NpgsqlDataSourceBuilder(connectionString);
npgsqlBuilder.MapEnum<Role>();
npgsqlBuilder.MapEnum<Genre>();
var dataSource = npgsqlBuilder.Build();

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.AddInterceptors(new TimestampInterceptor());
    options.UseNpgsql(dataSource)
    .UseSnakeCaseNamingConvention();
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
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Bearer token authentication",
        Name = "Authorization",
        In = ParameterLocation.Header,
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddSingleton<OwnerOnlyRequirementHandler>();

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "library-backend",
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj")),
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("OwnerOnly", policy => policy.Requirements.Add(new OwnerOnlyRequirement()));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
/* if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} */
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

//app.UseHttpsRedirection();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
