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

    public class Schedulerervice : ISchedulerService
    {
        private ApplicationDbContext applicationDbContext;

        public Schedulerervice(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<SchedulerModel> CreateScheduler(SchedulerModel schedulerModel)
        {
            var currDate = DateTime.ParseExact(schedulerModel.TimeStamp,"R",CultureInfo.InvariantCulture,System.Globalization.DateTimeStyles.None);

            var scheduler = new Scheduler()
            {
                Id = schedulerModel.Id,
                TimeStamp = currDate,
                TherapistId = schedulerModel.TherapistId,
                ClientId = schedulerModel.ClientId,
                ProcedureId = schedulerModel.ProcedureId,
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
               .OrderByDescending(s => s.TimeStamp)
               .ToListAsync();
        }

        public async Task<IEnumerable<SchedulerModel>> GetSchedulers(string searchedDate, int hour)
        {
            if (searchedDate != null)
            {
                return await applicationDbContext.Schedulers
                .Select(SchedulerModel.ProjectTo())
                .Where(d => (DateTime.Parse(d.TimeStamp)).Year == (DateTime.Parse(searchedDate)).Year)
                .Where(d => (DateTime.Parse(d.TimeStamp)).Month == (DateTime.Parse(searchedDate)).Month)
                .Where(d => (DateTime.Parse(d.TimeStamp)).Day == (DateTime.Parse(searchedDate)).Day)
                .Where(t => (hour == 0 ? true : (DateTime.Parse(t.TimeStamp)).Hour == hour))
                .ToListAsync();
            }

            return await applicationDbContext.Schedulers
                .Select(SchedulerModel.ProjectTo())
                .ToListAsync();
        }

        public async Task<SchedulerModel> UpdateScheduler(SchedulerModel schedulerModel, Guid id)
        {
            var scheduler = this.applicationDbContext.Schedulers.FirstOrDefault(x => x.Id == id);

            if (schedulerModel.Id != Guid.Empty)
            {
                scheduler.Id = schedulerModel.Id;
            }
            else if (schedulerModel.TimeStamp != string.Empty)
            {
                scheduler.TimeStamp = DateTime.ParseExact(schedulerModel.TimeStamp
                    , "O"
                    , CultureInfo.InvariantCulture
                    , System.Globalization.DateTimeStyles.None);
            }
            else if (schedulerModel.ClientId != Guid.Empty)
            {
                scheduler.ClientId = schedulerModel.ClientId;
            }
            else if (schedulerModel.TherapistId <= 0)
            {
                scheduler.TherapistId = schedulerModel.TherapistId;
            }
            else if (schedulerModel.ProcedureId <=0)
            {
                scheduler.ProcedureId = schedulerModel.ProcedureId;
            }


            this.applicationDbContext.Schedulers.Update(scheduler);

            await this.applicationDbContext.SaveChangesAsync();
            schedulerModel.Id = id;
            return (schedulerModel);
        }
    }
}
