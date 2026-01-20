namespace InvestmentsApi.Models
{
    public class InvestmentOption
    {
        public string Name { get; set; } = "";
        public decimal AmountRequired { get; set; }
        public decimal MinReturn { get; set; }
        public decimal MaxReturn { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
