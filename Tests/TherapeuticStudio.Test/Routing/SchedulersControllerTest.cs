namespace TherapeuticStudio.Test.Routing
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;

    using Xunit;
    public class SchedulersControllerTest
    {
        [Fact]
        public void SchedulerRouteShouldBeMapped()
           => MyRouting
               .Configuration()
               .ShouldMap("/api/schedulers")
               .To<SchedulersController>();
    }
}
