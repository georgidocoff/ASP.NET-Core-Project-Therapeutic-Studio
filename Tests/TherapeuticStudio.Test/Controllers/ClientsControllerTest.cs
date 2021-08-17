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

    using Xunit;

    using static Data.ClientTest;
    using static Data.TestConstants;

    public class ClientsControllerTest
    {

        [Fact]
        public void OnGetCallReturnCorrectData()
            => MyMvc
                .Controller<ClientsController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Get())
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<IEnumerable<ClientModel>>());

        [Fact]
        public void OnCreateReturnCorrectData()
            => MyMvc
                .Controller<ClientsController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Create(new ClientModel
                    {
                        FirstName = "TestName",
                        LastName = "TestName",
                        UCN = "9999999999",
                    }))
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<ClientModel>());

        [Fact]
        public void OnUpdateWithNoneAdminRoleUserReturnOk()
           => MyMvc
               .Controller<ClientsController>(instance => instance
                   .WithUser("TestUser"))
                   .Calling(c => c.Update(Guid.NewGuid(), new ClientModel
                   {
                       FirstName = "TestName",
                       LastName = "TestName",
                       UCN = "9999999999",
                   }))
                .ShouldReturn()
                .BadRequest();

        [Fact]
        public void OnDeleteWithNoneAdminRoleUserReturnBadRequest()
           => MyMvc
               .Controller<ClientsController>(instance => instance
                   .WithUser())
                   .Calling(c => c.Delete(Guid.NewGuid()))
                .ShouldReturn()
                .BadRequest();
    }
}
