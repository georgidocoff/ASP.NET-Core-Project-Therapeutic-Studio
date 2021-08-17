namespace TherapeuticStudio.Test.Pipeline
{
    using MyTested.AspNetCore.Mvc;

    using System;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Services.Schedulers;
    using TherapeuticStudio.Test.Data;

    using Xunit;

    using static Data.SchedulerTest;
    using static Data.TestConstants;

    public class SchedulersControllerTest
    {
        [Fact]
        public void GetSchedulerPipe()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(schedulerRouteGetDates)
                    .To<SchedulersController>(p => p.Get(searchedDate.ToString("R"), ZeroHour))
                    .Which(controller => controller
                    .ShouldReturn()
                        .Ok());
    }
}
