namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Schedulers;

    [ApiController]
    [Route("api/schedulers")]
    public class SchedulersController : ControllerBase
    {
        private readonly ISchedulerService schedulerService;

        public SchedulersController(ISchedulerService schedulerService)
        {
            this.schedulerService = schedulerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SchedulerModel>>> Get(string searchedDate, int hour)
        {
            var schedulers = await this.schedulerService.GetSchedulers(searchedDate, hour);
            return this.Ok(schedulers);
        }

        [HttpGet]
        [Route("client")]
        public async Task<ActionResult<IEnumerable<SchedulerModel>>> GetClientScheduler(Guid clientId)
        {
            var clientScheduler = await this.schedulerService.GetSchedulerClient(clientId);
            return this.Ok(clientScheduler);
        }

        [HttpPost]
        public async Task<ActionResult<SchedulerModel>> Create(SchedulerModel schedulerModel)
        {
            try
            {
                var scheduler = await this.schedulerService.CreateScheduler(schedulerModel);
                return this.Ok(scheduler);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<ActionResult<SchedulerModel>> Update(Guid id, SchedulerModel schedulerModel)
        {
            try
            {
                var scheduler = await this.schedulerService.UpdateScheduler(schedulerModel, id);
                return this.Ok(scheduler);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<SchedulerModel>> Delete(Guid id)
        {
            try
            {
                var scheduler = await this.schedulerService.DeleteScheduler(id);
                return this.Ok(scheduler);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
