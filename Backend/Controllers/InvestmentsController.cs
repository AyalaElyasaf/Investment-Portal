using InvestmentsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

[ApiController]
[Route("api/investments")]
public class InvestmentsController : ControllerBase
{
    private readonly InvestmentService _service;

    public InvestmentsController(InvestmentService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] string name)
    {
        if (!Regex.IsMatch(name, "^[A-Za-z]{3,}$"))
            return BadRequest("Invalid user name");
        _service.GetOrCreateUser(name);
        return Ok();
    }

    [HttpGet("state")]
    public IActionResult State([FromQuery] string userName)
    {
        return Ok(_service.GetOrCreateUser(userName));
    }

    [HttpPost("invest/{name}")]
    public IActionResult Invest(string name, [FromQuery] string userName)
    {
        try
        {
            if (!_service.CanInvest(userName, name, out var error))
                return BadRequest(new { message = error });
            _service.EnqueueInvestment(userName, name);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("history/{userName}")]
    public IActionResult GetHistory(string userName)
    {
        try
        {
            var history = _service.GetUserHistory(userName);
            return Ok(history);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
