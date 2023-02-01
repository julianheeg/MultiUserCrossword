export type ICrossword = { grid: (IWhiteCell | IBlackCell)[][] }

export interface ICell {
    isWhiteCell: boolean;
}

export interface IBlackCell extends ICell {
    clueAcross?: string;
    clueDown?: string;
}

export interface IWhiteCell extends ICell {
    solutionCharacter: string;
    guessedCharacter?: string;
}