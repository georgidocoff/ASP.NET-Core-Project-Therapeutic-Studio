namespace TherapeuticStudio.Test.Data
{
    using TherapeuticStudio.Services.Payments;

    using static Data.TestConstants;

    public static class PaymentTest
    {
        public static string apiRoute = "api/payments";

        public static string paymentRouteCreate = $"{apiRoute}/?schedulerId=${SchedulertGuid}";

        public static string paymentRouteGetByDates = $"{apiRoute}/date/?current={DateTimeNow.ToUniversalTime().ToString("R").Replace(" ","%20")}";

        public static PaymentModel paymentModel = new PaymentModel
        {
            ClientId = ClientGuid,
            Price = Price,
            Type = PaymentType,
            CreateTimeStamp = DateTimeNow,
        };
    }
}
