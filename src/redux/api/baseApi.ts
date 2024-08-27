import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gym-server-umber.vercel.app" }),
  tagTypes: ["cards", "slots", "slots-routes", "history"],
  endpoints: (builder) => ({
    // Queries
    getPassport: builder.query({
      query: (number) => `/passport/${number}`,
    }),

    getCards: builder.query({
      query: () => `cards`,
      providesTags: ["cards"],
    }),

    getCard: builder.query({
      query: (id) => `cards/${id}`,
      providesTags: ["cards"],
    }),

    getSlot: builder.query({
      query: (path) => `slots/${path}`,
      providesTags: ["slots"],
    }),

    getSlotRow: builder.query({
      query: (options) => `row${options.path}-${options.id}`,
      providesTags: ["slots"],
    }),

    getSlotRoutes: builder.query({
      query: () => `/slots-routes`,
      providesTags: ["slots-routes"],
    }),

    getHistory: builder.query({
      query: () => `/history`,
      providesTags: ["history"],
    }),

    // Mutations

    // Add
    addCard: builder.mutation({
      query: (data) => ({
        url: `add-cards`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cards"],
    }),

    addRow: builder.mutation({
      query: (options) => ({
        url: `add-slot-row${options.path}`,
        method: "POST",
        body: options.modifiedForm,
      }),
      invalidatesTags: ["slots"],
    }),

    addSlotsRoute: builder.mutation({
      query: (slotRouteInfo) => ({
        url: "/add-slots-route",
        method: "POST",
        body: slotRouteInfo,
      }),
      invalidatesTags: ["slots-routes"],
    }),

    addHistory: builder.mutation({
      query: (info) => ({
        url: "/add-to-history",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["history"],
    }),

    // Edit
    updateCard: builder.mutation({
      query: (options) => ({
        url: `/cards/${options.id}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["cards"],
    }),

    updateSlotRow: builder.mutation({
      query: (options) => ({
        url: `edit${options.path}-${options.id}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["slots"],
    }),

    updateSlotsRoutes: builder.mutation({
      query: (options) => ({
        url: `/slots/${options.id}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["slots"],
    }),

    // Delete
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `delete-card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cards"],
    }),

    deleteRow: builder.mutation({
      query: (options) => ({
        url: `delete-row${options.path}-${options.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["slots"],
    }),

    deleteSlotsRoutes: builder.mutation({
      query: (options) => ({
        url: `/slots-routes/${options.id}?href=${options.href}&slot=${options.slot}`,
        body: options.href,
        method: "DELETE",
      }),
      invalidatesTags: ["slots-routes", "slots"],
    }),
  }),
});

export const {
  useGetPassportQuery,
  useGetCardsQuery,
  useGetCardQuery,
  useGetSlotQuery,
  useGetSlotRowQuery,
  useGetSlotRoutesQuery,
  useGetHistoryQuery,
  useAddCardMutation,
  useAddRowMutation,
  useAddSlotsRouteMutation,
  useAddHistoryMutation,
  useUpdateCardMutation,
  useUpdateSlotRowMutation,
  useDeleteCardMutation,
  useDeleteRowMutation,
  useDeleteSlotsRoutesMutation,
} = baseApi;
