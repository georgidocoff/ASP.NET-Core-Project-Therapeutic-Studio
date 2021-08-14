namespace TherapeuticStudio.Services.Procedures
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IProcedureService
    {
        Task<IEnumerable<ProcedureModel>> GetProcedures();

        Task<ProcedureModel> CreateProcedure(ProcedureModel procedureModel);

        Task<ProcedureModel> UpdateProcedure(ProcedureModel procedureModel, int id);

        Task<ProcedureModel> DeleteProcedure(int id);
    }
}
