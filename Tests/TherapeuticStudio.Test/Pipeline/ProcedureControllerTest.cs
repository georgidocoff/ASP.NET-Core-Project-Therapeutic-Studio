namespace TherapeuticStudio.Test.Pipeline
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Test.Data;

    using Xunit;

    using static Data.ProcedureTest;

    public class ProcedureControllerTest
    {
        [Fact]
        public void GetProcedurePipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap("api/procedures")
                    .To<ProceduresController>(p => p.Get())
                    .Which(controller => controller
                    .ShouldReturn()
                        .Ok());

        [Fact]
        public void CreateProcedurePipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(request => request
                    .WithLocation("api/procedures")
                    .WithMethod(HttpMethod.Post)
                    .WithUser()
                    .WithAntiForgeryToken()
                    .WithJsonBody(new
                    {
                        Name = "TestProcedure",
                        Duration = 10,
                        Price = 1
                    })
                    )
                    .To<ProceduresController>(p => p.Create(new ProcedureModel
                    {
                        Name = "TestProcedure",
                        Duration = 10,
                        Price = 1
                    }))
                    .Which(controler => controler
                    .ShouldReturn()
                    .Ok());
    }
}
