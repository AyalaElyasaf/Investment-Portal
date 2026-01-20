using System.Collections.Concurrent;

namespace InvestmentsApi.Models
{
    public class InvestmentQueue
    {
        public ConcurrentQueue<InvestmentRequest> Queue { get; } = new();
    }
}
