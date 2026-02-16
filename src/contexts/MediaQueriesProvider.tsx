import * as React from 'react';

export type MediaQueriesType = Record<string, string>;

type MediaQueriesContextType = MediaQueriesType;

const MediaQueriesContext = React.createContext<MediaQueriesContextType | undefined>(undefined);

type MediaQueriesProviderProps = {
  mediaQueries: MediaQueriesType;
  children: React.ReactNode;
};

export const MediaQueriesProvider = (
  { mediaQueries, children }: MediaQueriesProviderProps
) => {
  return (
    <MediaQueriesContext.Provider value={mediaQueries}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

export const useMediaQueries = (): MediaQueriesType | null => {
  const context = React.useContext(MediaQueriesContext);
  if (!context) {
    return null;
  }
  return context;
};
