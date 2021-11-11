export interface Snippet {
  id: number;
  title: string;
  body: string;
  pinned: boolean;
  tags: string[];
}

export type NewSnippet = Omit<Snippet, 'id'>;

export function isSnippet(snippet: Snippet | NewSnippet): snippet is Snippet {
  return (snippet as Snippet).id !== undefined;
}
