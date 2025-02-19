using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace opggApi.Services
{
    public class ApiKeyService
    {
        public string ApiKey { get; }

        public ApiKeyService(string apiKey)
        {
            ApiKey = apiKey;
        }
    }
}


//USE CASE EXAMPLE:

// public class SomeService
// {
//     private readonly ApiKeyService _apiKeyService;

//     public SomeService(ApiKeyService apiKeyService)
//     {
//         _apiKeyService = apiKeyService;
//     }

//     public void UseApiKey()
//     {
//         var apiKey = _apiKeyService.ApiKey;
//         // Use the API key for your requests
//     }
// }
