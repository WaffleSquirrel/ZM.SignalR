﻿using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.ValueProviders;

namespace TZM.SignalR.WebApi.Infrastructure
{
    public class RequestHeaderValueProviderFactory : ValueProviderFactory
    {
        public override IValueProvider GetValueProvider(HttpActionContext context)
        {
            if (context.Request.Method == HttpMethod.Get)
            {
                return new RequestHeaderValueProvider(new RequestHeaderMap(context.Request.Headers));
            }
            else
            {
                return null;
            }
        }
    }
}