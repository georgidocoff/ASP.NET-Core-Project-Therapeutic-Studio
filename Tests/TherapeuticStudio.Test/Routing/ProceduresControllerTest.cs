namespace TherapeuticStudio.Test.Routing
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;

    using Xunit;

    public class ProceduresControllerTest
    {
        [Fact]
        public void ProcedureRouteShouldBeMapped()
            => MyRouting
                .Configuration()
                .ShouldMap("/api/procedures")
                .To<ProceduresController>();       
    }
}
