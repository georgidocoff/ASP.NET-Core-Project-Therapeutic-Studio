namespace TherapeuticStudio.Controllers
{
    using IdentityServer4.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Net.Http.Headers;

    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data.Enums;
    using TherapeuticStudio.Services.Extensions;
    using TherapeuticStudio.Services.Payments;

    using static Data.ApiConstants;

    [Authorize(Roles = AdministratorRoleName)]
    [ApiController]
    [Route("api/payments")]
    public class PaymentController : ControllerBase
    {
        private IPaymentService paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        [HttpPost]
        public async Task<ActionResult<PaymentModel>> Create(PaymentModel paymentModel, Guid schedulerId)
        {
            try
            {
                var payment = await this.paymentService.CreatePayment(paymentModel, schedulerId);
                return this.Ok(payment);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }


        [HttpGet("date")]
        public async Task<ActionResult<IEnumerable<PaymentModel>>> GetDates(string current)
        {
            if (!this.User.IsAdmin())
            {
                return Unauthorized();
            }

            var payments = await this.paymentService.GetPaymentsByDate(current);
            return this.Ok(payments);
        }
    }
}
