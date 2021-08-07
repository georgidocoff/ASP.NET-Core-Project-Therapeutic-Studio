namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using System;
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
                if (paymentModel.Type == 0)
                {
                    return this.NoContent();
                }

                var payment = await this.paymentService.CreatePayment(paymentModel, schedulerId);
                return this.Ok(payment);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
