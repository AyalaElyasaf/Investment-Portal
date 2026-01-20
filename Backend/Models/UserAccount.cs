namespace InvestmentsApi.Models
{
    public class UserAccount
    {
        public string UserName { get; set; } = "";
        public decimal Balance { get; set; } = 1000;
        public List<ActiveInvestment> ActiveInvestments { get; set; } = new();
        public List<InvestmentHistory> History { get; set; } = new();
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}
