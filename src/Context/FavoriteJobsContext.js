import React from 'react';

const FavoriteJobsContext = React.createContext('');

export const FavoriteJobsProvider = FavoriteJobsContext.Provider;
export const FavoriteJobsConsumer = FavoriteJobsContext.Consumer;
export default FavoriteJobsContext;
