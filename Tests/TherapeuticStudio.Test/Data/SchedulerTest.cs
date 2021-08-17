namespace TherapeuticStudio.Test.Data
{
    using System;

    using TherapeuticStudio.Services.Schedulers;

    using static Data.TestConstants;

    public static class SchedulerTest
    {
        public static string apiRoute = "api/schedulers";

        public static DateTime searchedDate = DateTime.Now.ToUniversalTime();

        public static string ZeroHour = "0";

        public static string schedulerRouteGetDates = $"api/schedulers/?searchedDate={searchedDate.ToString("R").Replace(" ", "%20")}&hour={ZeroHour}";

        public static SchedulerModel schedulerModel = new SchedulerModel
        {
            ClientId = ClientGuid,
            PaymentId = PaymentGuid,
            ProcedureId = ProcedureId,
            TherapistId = TherapistId,
            PaymentType = PaymentType,
            TimeStamp = DateTimeNow.ToString("R"),
        };

    }
}
