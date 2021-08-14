namespace TherapeuticStudio.Services.Schedulers
{
    using Microsoft.EntityFrameworkCore;

    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;

    public class SchedulerService : ISchedulerService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public SchedulerService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<SchedulerModel> CreateScheduler(SchedulerModel schedulerModel)
        {
            var currDate = DateTime.ParseExact(schedulerModel.TimeStamp, "R", CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None);

            var scheduler = new Scheduler()
            {
                Id = schedulerModel.Id,
                TimeStamp = currDate,
                TherapistId = schedulerModel.TherapistId,
                ClientId = schedulerModel.ClientId,
                ProcedureId = schedulerModel.ProcedureId,
                PaymentType = schedulerModel.PaymentType
            };

            this.applicationDbContext.Schedulers.Add(scheduler);

            await this.applicationDbContext.SaveChangesAsync();
            schedulerModel.Id = scheduler.Id;
            return schedulerModel;
        }

        public async Task<SchedulerModel> DeleteScheduler(Guid id)
        {
            var scheduler = this.applicationDbContext.Schedulers.FirstOrDefault(s => s.Id == id);
            this.applicationDbContext.Remove(scheduler);

            await this.applicationDbContext.SaveChangesAsync();
            return new SchedulerModel { Id = id };
        }

        public async Task<IEnumerable<SchedulerModel>> GetSchedulerClient(Guid clientId)
        {
            return await applicationDbContext.Schedulers
               .Select(SchedulerModel.ProjectTo())
               .Where(s => s.ClientId == clientId)
               //.OrderByDescending(s => s.TimeStamp)
               .ToListAsync();
        }

        public async Task<IEnumerable<SchedulerModel>> GetSchedulers(string searchedDate, int hour)
        {
            if (searchedDate != "null")
            {
                var currentYear = convertDatePart(searchedDate).Year;
                var currentMonth = convertDatePart(searchedDate).Month;
                var currentDay = convertDatePart(searchedDate).Day;

                return await applicationDbContext.Schedulers
                .Select(SchedulerModel.ProjectTo())
                //.Where(d => d.TimeStamp == $"{currentYear}-{currentMonth}-{currentDay}")
                .Where(t => (hour == 0 ? true : convertDatePart(t.TimeStamp).Hour == hour))
                .ToListAsync();
            }

            return await applicationDbContext.Schedulers
                .Select(SchedulerModel.ProjectTo())
                .ToListAsync();
        }

        private DateTime convertDatePart(string dateElement)
        {
            return (DateTime.ParseExact(dateElement, "R", CultureInfo.InvariantCulture));
        }

        public async Task<SchedulerModel> UpdateScheduler(SchedulerModel schedulerModel, Guid id)
        {
            var scheduler = this.applicationDbContext.Schedulers.FirstOrDefault(x => x.Id == id);

            if (schedulerModel.Id != Guid.Empty)
            {
                scheduler.Id = schedulerModel.Id;
            }
            if (schedulerModel.TimeStamp != null)
            {
                scheduler.TimeStamp = DateTime.ParseExact(schedulerModel.TimeStamp, "R", CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None);
            }
            if (schedulerModel.ClientId != Guid.Empty)
            {
                scheduler.ClientId = schedulerModel.ClientId;
            }
            if (schedulerModel.TherapistId >= 0)
            {
                scheduler.TherapistId = schedulerModel.TherapistId;
            }
            if (schedulerModel.ProcedureId >= 0)
            {
                scheduler.ProcedureId = schedulerModel.ProcedureId;
            }
            if (schedulerModel.PaymentType >= 0)
            {
                scheduler.PaymentType = schedulerModel.PaymentType;
            }
            if (schedulerModel.PaymentId != Guid.Empty)
            {
                scheduler.PaymentId = schedulerModel.PaymentId;
            }
            this.applicationDbContext.Schedulers.Update(scheduler);

            await this.applicationDbContext.SaveChangesAsync();
            schedulerModel.Id = id;
            return (schedulerModel);
        }
    }
}
