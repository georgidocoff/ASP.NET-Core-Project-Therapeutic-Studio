namespace TherapeuticStudio.Services.Procedures
{
    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;

    public class ProcedureService : IProcedureService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public ProcedureService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<ProcedureModel> CreateProcedure(ProcedureModel procedureModel)
        {
            var procedure = new Procedure()
            {
                Id = procedureModel.Id,
                Name = procedureModel.Name,
                Duration = procedureModel.Duration,
                Price = procedureModel.Price
            };

            this.applicationDbContext.Procedures.Add(procedure);

            await this.applicationDbContext.SaveChangesAsync();
            procedureModel.Id = procedure.Id;
            return procedureModel;
        }

        public async Task<ProcedureModel> DeleteProcedure(int id)
        {
            var procedure = this.applicationDbContext.Procedures.FirstOrDefault(s => s.Id == id);
            this.applicationDbContext.Procedures.Remove(procedure);
            await this.applicationDbContext.SaveChangesAsync();
            return new ProcedureModel { Id = id };
        }

        public async Task<IEnumerable<ProcedureModel>> GetProcedures()
        {
            return await applicationDbContext.Procedures
                .Select(ProcedureModel.ProjectTo())
                .ToListAsync();
        }

        public async Task<ProcedureModel> UpdateProcedure(ProcedureModel procedureModel, int id)
        {
            var procedure = this.applicationDbContext.Procedures.FirstOrDefault(x => x.Id == id);

            if (procedureModel.Name != string.Empty)
            {
                procedure.Name = procedureModel.Name;
            }
            else if (procedureModel.Duration != 0)
            {
                procedure.Duration = procedureModel.Duration;
            }
            else if (procedureModel.Price != 0m)
            {
                procedure.Price = procedureModel.Price;
            }

            this.applicationDbContext.Procedures.Update(procedure);

            await this.applicationDbContext.SaveChangesAsync();
            procedureModel.Id = id;
            return (procedureModel);
        }
    }
}
