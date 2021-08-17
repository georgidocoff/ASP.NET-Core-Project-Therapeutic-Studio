namespace TherapeuticStudio.Test.Routing
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;

    using Xunit;

    public class ClientsControllerTest
    {
        [Fact]
        public void ClientRouteShouldBeMapped()
         => MyRouting
             .Configuration()
             .ShouldMap("/api/clients")
             .To<ClientsController>();
    }
}
