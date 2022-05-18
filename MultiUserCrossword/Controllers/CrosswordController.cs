using Puzzle;
using Microsoft.AspNetCore.Mvc;

namespace MultiUserCrossword.Controllers;

[ApiController]
[Route("[controller]")]
public class CrosswordController : ControllerBase
{
    private readonly ILogger<CrosswordController> _logger;

    public CrosswordController(ILogger<CrosswordController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public Crossword Get()
    {
        var crossword = Crossword.GenerateHardCodedExample();
        return crossword;
    }
}
