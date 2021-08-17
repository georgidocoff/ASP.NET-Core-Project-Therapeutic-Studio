namespace TherapeuticStudio.Test.Pipeline
{
    using MyTested.AspNetCore.Mvc;

    using System;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Clients;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Test.Data;

    using Xunit;

    using static Data.ClientTest;
    using static Data.TestConstants;

    public class ClientsControllerTest
    {
        [Fact]
        public void GetClientPipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(apiRoute)
                    .To<ClientsController>(p => p.Get())
                    .Which(controller => controller
                    .ShouldReturn()
                        .Ok());

        [Fact]
        public void CreateClientPipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(request => request
                    .WithLocation(apiRoute)
                    .WithMethod(HttpMethod.Post)
                    .WithUser()
                    .WithAntiForgeryToken()
                    .WithJsonBody(new
                    {
                        FirstName = "Test",
                        LastName = "Test",
                        UCN = "9999999999",
                    })
                    )
                    .To<ClientsController>(p => p.Create(clientModel))
                    .Which(controler => controler
                    .ShouldReturn()
                    .Ok());
    }
}
