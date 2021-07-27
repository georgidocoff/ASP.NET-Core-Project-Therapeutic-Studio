namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Procedures;

    [ApiController]
    [Route("api/procedures")]
    public class ProceduresController : ControllerBase
    {
        private readonly IProcedureService procedureService;

        public ProceduresController(IProcedureService procedureService)
        {
            this.procedureService = procedureService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcedureModel>>> Get()
        {
            var clients = await this.procedureService.GetProcedures();
            return this.Ok(clients);
        }

        [HttpPost]
        public async Task<ActionResult<ProcedureModel>> Create(ProcedureModel procedureModel)
        {
            try
            {
                var procedure = await this.procedureService.CreateProcedure(procedureModel);
                return this.Ok(procedure);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<ActionResult<ProcedureModel>> Update(int id, ProcedureModel procedureModel)
        {
            try
            {
                var procedure = await this.procedureService.UpdateProcedure(procedureModel, id);
                return this.Ok(procedure);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ProcedureModel>> Delete(int id)
        {
            try
            {
                var procedure = await this.procedureService.DeleteProcedure(id);
                return this.Ok(procedure);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
