namespace TherapeuticStudio.Test.Controllers
{
    using MyTested.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Services.Clients;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Services.Therapists;

    using Xunit;

    using TherapeuticStudio.Data.Enums;

    public class TherapistsControllerTest
    {

        [Fact]
        public void OnGetCallReturnCorrectData()
            => MyMvc
                .Controller<TherapistsController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Get())
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<IEnumerable<TherapistModel>>());

        [Fact]
        public void OnCreateReturnCorrectData()
            => MyMvc
                .Controller<TherapistsController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Create(new TherapistModel
                    {
                        FirstName = "TestName",
                        LastName = "TestName",
                        RoleType = RoleType.Administrator,
                        PositionType = PositionType.Student
                    }))
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<TherapistModel>());

        [Fact]
        public void OnUpdateWithNoneAdminRoleUserReturnOk()
           => MyMvc
               .Controller<TherapistsController>(instance => instance
                   .WithUser("TestUser"))
                   .Calling(c => c.Update(1, new TherapistModel
                   {
                       FirstName = "TestName",
                       LastName = "TestName",
                       RoleType = RoleType.Administrator,
                       PositionType = PositionType.Student
                   }))
                .ShouldReturn()
                .BadRequest();

        [Fact]
        public void OnDeleteWithNoneAdminRoleUserReturnBadRequest()
           => MyMvc
               .Controller<TherapistsController>(instance => instance
                   .WithUser())
                   .Calling(c => c.Delete(1))
                .ShouldReturn()
                .BadRequest();
    }
}