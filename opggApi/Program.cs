using opggApi.Controllers;
using opggApi.Interfaces;
using opggApi.Repositories; // Assuming the implementation is in this namespace
using opggApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers(); // Register controllers
builder.Services.AddHttpClient(); // Register HttpClient

// Retrieve the API key from environment variables
var apiKey = Environment.GetEnvironmentVariable("LOL_API_KEY");
if (string.IsNullOrEmpty(apiKey))
{
    throw new InvalidOperationException("API key not found in environment variables.");
}

// Register the API key in the service container
builder.Services.AddSingleton(new ApiKeyService(apiKey));

// Register IProfileRepository and its implementation
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<IMatchRepository, MatchRepository>();
builder.Services.AddScoped<IRuneRepository, RuneRepository>();

// Register ProfileController with a scoped lifetime

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// Map controllers
app.MapControllers();

app.Run();
