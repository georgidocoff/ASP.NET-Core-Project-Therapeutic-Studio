namespace TherapeuticStudio.Test.Pipeline
{
    using MyTested.AspNetCore.Mvc;

    using System;

    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Services.Clients;
    using TherapeuticStudio.Services.Payments;
    using TherapeuticStudio.Services.Procedures;
    using TherapeuticStudio.Test.Data;

    using Xunit;

    using static Data.PaymentTest;
    using static Data.TestConstants;

    public class PaymentsControllerTest
    {
        [Fact]
        public void GetPaymentPipeReturnUnaoutorized()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(paymentRouteGetByDates)
                    .To<PaymentController>(p => p.GetDates(DateTimeNow.ToUniversalTime().ToString("R")))
                    .Which(controller => controller
                    .ShouldReturn()
                    .Unauthorized());

        [Fact]
        public void GetPaymentPipeAdmiUserReturnOk()
            =>
                MyMvc
                    .Pipeline()
                    .ShouldMap(paymentRouteGetByDates)
                    .To<PaymentController>(p => p.GetDates(DateTimeNow.ToUniversalTime().ToString("R")))
                    .Which(controller => controller.WithUser(user => user.InRole("Administrator"))
                    .ShouldReturn()
                    .Ok());
    }
}
