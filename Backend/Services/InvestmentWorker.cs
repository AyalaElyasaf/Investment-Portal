using InvestmentsApi.Models;

namespace InvestmentsApi.Services
{
    public class InvestmentWorker : BackgroundService
    {
        private readonly InvestmentService _service;
        private readonly InvestmentQueue _queue;

        public InvestmentWorker(InvestmentService service, InvestmentQueue queue)
        {
            _service = service;
            _queue = queue;
        }

        protected override async Task ExecuteAsync(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                if (_queue.Queue.TryDequeue(out var req))
                    try
                    {
                        _service.ProcessInvestment(req.UserName, req.InvestmentName);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString(), "Investment processing failed");
                    }
                foreach (var user in _service.Users)
                {
                    var finished = user.ActiveInvestments
                        .Where(i => i.EndTime <= DateTime.UtcNow)
                        .ToList();

                    foreach (var inv in finished)
                        _service.CompleteInvestment(user.UserName, inv);
                }

                await Task.Delay(1000, token);
            }
        }
    }
}
