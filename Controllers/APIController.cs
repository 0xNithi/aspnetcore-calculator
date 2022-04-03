using Microsoft.AspNetCore.Mvc;
using calculator.Models;
using System.Data;

namespace calculator.Controllers;

public class APIController : Controller
{
    private readonly ILogger<APIController> _logger;

    public APIController(ILogger<APIController> logger)
    {
        _logger = logger;
    }

    public IActionResult Calculate([FromBody] CalculateModel item)
    {
        if (item == null)
        {
            return BadRequest();
        }


        try
        {
            DataTable dt = new DataTable();
            return Ok(dt.Compute(item.Context, ""));
        }
        catch
        {
            return BadRequest();
        }


    }
}
