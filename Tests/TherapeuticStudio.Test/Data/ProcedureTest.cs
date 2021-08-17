namespace TherapeuticStudio.Test.Data
{
    using System.Collections.Generic;
    using System.Linq;

    using TherapeuticStudio.Data.Entity;

    public static class ProcedureTest
    {
        public static Procedure NewProcedure
            => new Procedure
            {
                Name = "Test",
                Duration = 10,
                Price = 1
            };


        public static IEnumerable<Procedure> DataProcedures
            => Enumerable.Range(0, 1).Select(i => new Procedure()
            {
                Id = 1,
                Name = "Test",
                Duration = 10,
                Price = 1
            });
    }
}
