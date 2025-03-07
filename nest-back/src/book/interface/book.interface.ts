

export interface ICreateBook {
    name: string;
    type: 'A' | 'B' | 'C' | 'D';
    authorId: number;
    count?: number;
  }