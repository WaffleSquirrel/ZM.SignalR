﻿using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.ModelBinding.Binders;
using System.Web.Http.ValueProviders;
using ZM.SignalR.WebApi.Infrastructure;
using ZM.SignalR.WebApi.Models;
using ZM.SignalR.WebApi.Models.Binders;

namespace ZM.SignalR.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "HumanActions",
                routeTemplate: "api/{controller}/{action}/{humanId}/{guessedNumber}",
                defaults: new { controller = "humans", humanId = RouteParameter.Optional, guessedNumber = RouteParameter.Optional }
            );

            // Web API model bindings
            config.Services.Add(typeof(ValueProviderFactory), new RequestHeaderValueProviderFactory());

            config.Services.Insert(
                typeof(ModelBinderProvider), 
                0, 
                new SimpleModelBinderProvider(typeof(HumanRequest), new HumanRequestBinder())
            );
        }
    }
}