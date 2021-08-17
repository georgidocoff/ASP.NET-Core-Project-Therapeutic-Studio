namespace TherapeuticStudio.Test.Controllers
{
    using MyTested.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Payments;

    using Xunit;

    public class PaymentsControllerTest
    {

        [Fact]
        public void OnGetDatesCallWithNoAdminRoleUserReturnUnauthorize()
            => MyMvc
                .Controller<PaymentController>(instance => instance
                    .WithUser("TestUser"))
                    .Calling(c => c.GetDates(DateTime.Now.ToString("R")))
                    .ShouldReturn()
                    .Unauthorized();

        [Fact]
        public void OnGetDatesCallAdminRoleUserReturnOk()
            => MyMvc
                .Controller<PaymentController>(instance => instance
                    .WithUser(user=>user.InRole("Administrator")))
                    .Calling(c => c.GetDates(DateTime.Now.ToString("R")))
                    .ShouldHave()
                    .ActionAttributes(attributes => attributes
                    .RestrictingForAuthorizedRequests())
                    .AndAlso()
                    .ShouldReturn()
                    .Ok(result=>result.WithModelOfType<IEnumerable<PaymentModel>>());

    }
}
