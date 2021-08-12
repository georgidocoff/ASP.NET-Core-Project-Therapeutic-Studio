namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Therapists;

    using static Data.ApiConstants;

    [Authorize]
    [ApiController]
    [Route("api/therapists")]
    public class TherapistsController : ControllerBase
    {
        private readonly ITherapistService therapistService;

        public TherapistsController(ITherapistService therapistService)
        {
            this.therapistService = therapistService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TherapistModel>>> Get()
        {
            var therapists = await this.therapistService.GetTherapists();
            return this.Ok(therapists);
        }

        [HttpPost]
        public async Task<ActionResult<TherapistModel>> Create(TherapistModel therapistModel)
        {
            try
            {
                var therapist = await this.therapistService.CreateTherapist(therapistModel);
                return this.Ok(therapist);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = AdministratorRoleName)]
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<TherapistModel>> Update(int id, TherapistModel therapistModel)
        {
            try
            {
                var therapist = await this.therapistService.UpdateTherapist(therapistModel, id);
                return this.Ok(therapist);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = AdministratorRoleName)]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<TherapistModel>> Delete(int id)
        {
            try
            {
                var therapist = await this.therapistService.DeleteTherapist(id);
                return this.Ok(therapist);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
