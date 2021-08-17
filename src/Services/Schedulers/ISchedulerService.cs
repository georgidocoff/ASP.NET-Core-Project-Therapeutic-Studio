namespace TherapeuticStudio.Services.Schedulers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ISchedulerService
    {
        Task<IEnumerable<SchedulerModel>> GetSchedulers(string searchedDate, int hour);

        Task<IEnumerable<SchedulerModel>> GetSchedulerClient(Guid clientId);

        Task<SchedulerModel> CreateScheduler(SchedulerModel schedulerModel);

        Task<SchedulerModel> UpdateScheduler(SchedulerModel schedulerModel, Guid id);
    }
}
