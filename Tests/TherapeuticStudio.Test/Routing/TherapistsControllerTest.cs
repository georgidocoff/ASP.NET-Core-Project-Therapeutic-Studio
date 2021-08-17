namespace TherapeuticStudio.Test.Routing
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;

    using Xunit;

    public class TherapistsControllerTest
    {
        [Fact]
        public void TherapistRouteShouldBeMapped()
           => MyRouting
               .Configuration()
               .ShouldMap("/api/therapists")
               .To<TherapistsController>();
    }
}
