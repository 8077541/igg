using opggApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Retrieve the API key from environment variables
var apiKey = Environment.GetEnvironmentVariable("LOL_API_KEY");
if (string.IsNullOrEmpty(apiKey))
{
    throw new InvalidOperationException("API key not found in environment variables.");
}

// Register the API key in the service container
builder.Services.AddSingleton(new ApiKeyService(apiKey));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
