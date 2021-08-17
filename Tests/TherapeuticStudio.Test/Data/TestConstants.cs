namespace TherapeuticStudio.Test.Data
{
    using System;

    public static class TestConstants
    {
        public static Guid ClientGuid = Guid.Parse("9105A0A3-A454-41DF-8FE3-08D951BF3B20");

        public static Guid PaymentGuid = Guid.Parse("37A46707-9933-4C6B-E300-08D954F2EA4B");

        public static Guid SchedulertGuid = Guid.Parse("06196A29-646F-4FC3-B8E4-08D95A31819F");

        public static int ProcedureId = 1;

        public static decimal Price = 10;

        public static int TherapistId = 1;

        public static int PaymentType = 0;

        public static DateTime DateTimeNow = DateTime.Now;
    }
}
