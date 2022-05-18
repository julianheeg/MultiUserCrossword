namespace Puzzle;

internal interface IBlackCell : ICell
{
    string? ClueAcross { get; }
    string? ClueDown { get; }
}
