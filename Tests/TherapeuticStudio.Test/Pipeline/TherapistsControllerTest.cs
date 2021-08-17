namespace TherapeuticStudio.Test.Pipeline
{
    using MyTested.AspNetCore.Mvc;

    using System;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Data.Enums;
    using TherapeuticStudio.Services.Clients;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Services.Therapists;
    using TherapeuticStudio.Test.Data;

    using Xunit;

    using static Data.ProcedureTest;

    public class TherapistsControllerTest
    {
        [Fact]
        public void GetTherapistPipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap("api/therapists")
                    .To<TherapistsController>(p => p.Get())
                    .Which(controller => controller
                    .ShouldReturn()
                        .Ok());

        [Fact]
        public void CreateTherapistPipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(request => request
                    .WithLocation("api/therapists")
                    .WithMethod(HttpMethod.Post)
                    .WithUser()
                    .WithAntiForgeryToken()
                    .WithJsonBody(new
                    {
                        FirstName = "TestName",
                        LastName = "TestName",
                        RoleType = RoleType.Guest,
                        PositionType = PositionType.Student
                    })
                    )
                    .To<TherapistsController>(p => p.Create(new TherapistModel
                    {
                        FirstName = "TestName",
                        LastName = "TestName",
                        RoleType = RoleType.Guest,
                        PositionType = PositionType.Student
                    }))
                    .Which(controler => controler
                    .ShouldReturn()
                    .Ok());
    }
}
