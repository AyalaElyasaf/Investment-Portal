namespace InvestmentsApi.Models
{
    public class InvestmentHistory
    {
        public string Name { get; set; } = "";
        public decimal Invested { get; set; }
        public decimal Returned { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}
