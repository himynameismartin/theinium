import * as React from 'react';

export type MediaQueriesType = string[] | null;

type MediaQueriesContextType = MediaQueriesType;

const MediaQueriesContext = React.createContext<MediaQueriesContextType | undefined>(undefined);

type MediaQueriesProviderProps = {
  mediaQueries: MediaQueriesType;
  children: React.ReactNode;
};

export const MediaQueriesProvider: React.FC<MediaQueriesProviderProps> = (
  { mediaQueries, children }: MediaQueriesProviderProps
) => {
  return (
    <MediaQueriesContext.Provider value={mediaQueries}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

export const useMediaQueries = (): MediaQueriesType => {
  const context = React.useContext(MediaQueriesContext);
  if (!context) {
    return null;
  }
  return context;
};
