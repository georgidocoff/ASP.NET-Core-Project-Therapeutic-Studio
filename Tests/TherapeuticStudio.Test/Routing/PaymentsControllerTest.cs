namespace TherapeuticStudio.Test.Routing
{
    using MyTested.AspNetCore.Mvc;

    using TherapeuticStudio.Controllers;

    using Xunit;

    public class PaymentsControllerTest
    {
        [Fact]
        public void PaymentRouteShouldBeMapped()
        => MyRouting
            .Configuration()
            .ShouldMap("api/payments/date")
            .To<PaymentController>();
    }
}
