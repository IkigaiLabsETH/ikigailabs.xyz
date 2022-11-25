import { createAction } from "@reduxjs/toolkit";

export const fetchCollectionToken = createAction<{ contract: string; tokenId: string }>('collection/token/fetch')
