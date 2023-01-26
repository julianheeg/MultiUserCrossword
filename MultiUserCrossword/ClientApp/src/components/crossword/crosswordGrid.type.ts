export interface Cell {
    isWhiteCell: boolean;
}

export interface BlackCell extends Cell {
    clueAcross?: string;
    clueDown?: string;
}

export interface WhiteCell extends Cell {
}