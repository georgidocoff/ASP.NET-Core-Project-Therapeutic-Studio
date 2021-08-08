namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Payments;

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
            var payments = await this.paymentService.GetPaymentsByDate(current);
            return this.Ok(payments);
        }

    }
}
