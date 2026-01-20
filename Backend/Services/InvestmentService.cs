using InvestmentsApi.Models;

namespace InvestmentsApi.Services
{
    public class InvestmentService
    {
        private readonly object _lock = new();
        private readonly InvestmentQueue _queue;
        private readonly Dictionary<string, UserAccount> _users;

        public IEnumerable<UserAccount> Users => _users.Values;

        public List<InvestmentOption> Options { get; } = new()
        {
            new() { Name="Short Term", AmountRequired=10, MinReturn=15, MaxReturn=25, Duration=TimeSpan.FromSeconds(10) },
            new() { Name="Mid Term", AmountRequired=100, MinReturn=200, MaxReturn=300, Duration=TimeSpan.FromSeconds(30) },
            new() { Name="Long Term", AmountRequired=1000, MinReturn=2500, MaxReturn=3500, Duration=TimeSpan.FromMinutes(1) },
        };

        public InvestmentService(InvestmentQueue queue)
        {
            _queue = queue;
            _users = JsonStorage.LoadUsers()
                .ToDictionary(u => u.UserName, u => u);
        }

        public UserAccount GetOrCreateUser(string name)
        {
            lock (_lock)
            {
                if (!_users.TryGetValue(name, out var user))
                {
                    user = new UserAccount { UserName = name };
                    _users[name] = user;
                    Save();
                }
                return user;
            }
        }

        public void EnqueueInvestment(string user, string investment)
        {
            _queue.Queue.Enqueue(new InvestmentRequest(user, investment));
        }

        public void ProcessInvestment(string userName, string investmentName)
        {
            lock (_lock)
            {
                var user = _users[userName];
                var opt = Options.First(o => o.Name == investmentName);

                if (user.Balance < opt.AmountRequired)
                    throw new InvalidOperationException("Insufficient balance");

                if (user.ActiveInvestments.Any(i => i.Name == investmentName))
                    throw new InvalidOperationException("Already invested");

                var expectedReturn = Random.Shared.Next((int)opt.MinReturn, (int)opt.MaxReturn);
                user.Balance -= opt.AmountRequired;
                user.ActiveInvestments.Add(new ActiveInvestment
                {
                    Name = opt.Name,
                    AmountInvested = opt.AmountRequired,
                    ExpectedReturn = expectedReturn,
                    EndTime = DateTime.UtcNow.Add(opt.Duration)
                });

                Save();
            }
        }

        public void CompleteInvestment(string userName, ActiveInvestment inv)
        {
            lock (_lock)
            {
                var user = _users[userName];

                user.Balance += inv.ExpectedReturn;
                user.ActiveInvestments.Remove(inv);
                user.History.Add(new InvestmentHistory
                {
                    Name = inv.Name,
                    Invested = inv.AmountInvested,
                    Returned = inv.ExpectedReturn,
                    CompletedAt = DateTime.UtcNow
                });

                Save();
            }
        }

        private void Save()
        {
            foreach (var u in _users.Values)
                u.LastUpdated = DateTime.UtcNow;

            JsonStorage.SaveUsers(_users.Values);
        }
        public bool CanInvest(string userName, string investmentName, out string error)
        {
            lock (_lock)
            {
                var user = _users[userName];
                var opt = Options.First(o => o.Name == investmentName);

                if (user.ActiveInvestments.Any(i => i.Name == investmentName))
                {
                    error = "Investment already active";
                    return false;
                }

                if (user.Balance < opt.AmountRequired)
                {
                    error = "Insufficient balance";
                    return false;
                }

                error = "";
                return true;
            }
        }
        public IEnumerable<InvestmentHistory> GetUserHistory(string userName)
        {
            if (!_users.ContainsKey(userName)) throw new Exception("User not found");
            return _users[userName].History;
        }
    }
}
