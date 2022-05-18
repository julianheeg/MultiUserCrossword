using Puzzle;
using Microsoft.AspNetCore.Mvc;

namespace MultiUserCrossword.Controllers;

[ApiController]
[Route("[controller]")]
public class CrosswordController : ControllerBase
{
    [HttpGet]
    public Crossword GetHardCodedExample()
    {
        var crossword = Crossword.GenerateHardCodedExample();
        return crossword;
    }
}
