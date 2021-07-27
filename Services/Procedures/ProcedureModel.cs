namespace TherapeuticStudio.Services.Procedures
{
    using System;
    using System.Linq.Expressions;

    using TherapeuticStudio.Data.Entity;

    public class ProcedureModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Duration { get; set; }

        public decimal Price { get; set; }

        public static Expression<Func<Procedure, ProcedureModel>> ProjectTo()
        {
            return procedure => new ProcedureModel
            {
                Id = procedure.Id,
                Name = procedure.Name,
                Duration = procedure.Duration,
                Price = procedure.Price
            };
        }
    }
}
