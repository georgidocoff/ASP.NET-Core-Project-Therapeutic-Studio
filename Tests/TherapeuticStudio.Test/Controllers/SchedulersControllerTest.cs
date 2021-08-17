namespace TherapeuticStudio.Test.Controllers
{
    using MyTested.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Schedulers;

    using Xunit;

    using static Data.SchedulerTest;
    using static Data.TestConstants;

    public class SchedulersControllerTest
    {

        [Fact]
        public void OnGetCallReturnCorrectData()
            => MyMvc
                .Controller<SchedulersController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Get(searchedDate.ToString("R"), ZeroHour))
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<IEnumerable<SchedulerModel>>());

        [Fact]
        public void OnCreateReturnCorrectData()
            => MyMvc
                .Controller<SchedulersController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.Create(schedulerModel))
                    .ShouldReturn()
                    .Ok(result => result
                    .WithModelOfType<SchedulerModel>());

        [Fact]
        public void OnUpdateWithNoneAdminRoleUserReturnBadRequest()
        {
            MyController<SchedulersController>
                           .Instance(controller => controller
                   .WithUser())
                   .Calling(c => c.Update(SchedulertGuid, schedulerModel))
                .ShouldReturn()
                .BadRequest();
        }
    }
}

