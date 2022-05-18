namespace Puzzle;

internal class BlackCell : IBlackCell
{
    public bool HasCharacter => false;

    public string? ClueAcross { get; init; }

    public string? ClueDown { get; init; }
}
