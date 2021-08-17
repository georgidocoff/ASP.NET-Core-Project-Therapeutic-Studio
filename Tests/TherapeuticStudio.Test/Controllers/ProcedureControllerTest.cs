namespace TherapeuticStudio.Test.Controllers
{
    using MyTested.AspNetCore.Mvc;

    using System.Collections.Generic;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Services.Procedures;

    using Xunit;

    using static Data.ProcedureTest;

    public class ProcedureControllerTest
    {

        [Fact]
        public void OnGetCallReturnCorrectData()
            => MyMvc
                .Controller<ProceduresController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Get())
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<IEnumerable<ProcedureModel>>());

        [Fact]
        public void OnCreateReturnCorrectData()
            => MyMvc
                .Controller<ProceduresController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Create(new ProcedureModel
                    {
                        Name = "TestProcedure",
                        Duration = 10,
                        Price = 1
                    }))
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<ProcedureModel>());

        [Fact]
        public void OnUpdateWithNoneAdminRoleUserReturnOk()
           => MyMvc
               .Controller<ProceduresController>(instance => instance
                   .WithUser("TestUser"))
                   .Calling(c => c.Update(1, new ProcedureModel
                   {
                       Name = "TestProcedure",
                       Duration = 10,
                       Price = 1
                   }))
                .ShouldReturn()
                .BadRequest();

        [Fact]
        public void OnDeleteWithNoneAdminRoleUserReturnBadRequest()
           => MyMvc
               .Controller<ProceduresController>(instance => instance
                   .WithUser())
                   .Calling(c => c.Delete(1))
                .ShouldReturn()
                .BadRequest();

    }
}
