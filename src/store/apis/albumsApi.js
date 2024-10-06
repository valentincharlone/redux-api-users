import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints: (builder) => ({
    addAlbum: builder.mutation({
      invalidatesTags: (result, error, user) => {
        return [{ type: "Album", id: user.id }];
      },
      query: (user) => ({
        url: "/albums",
        method: "POST",
        body: {
          userId: user.id,
          title: faker.commerce.productName(),
        },
      }),
    }),
    fetchAlbums: builder.query({
      providesTags: (result, error, user) => {
        return [{ type: "Album", id: user.id }];
      },
      query: (userId) => ({
        url: `/albums`,
        params: {
          userId: userId.id,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
