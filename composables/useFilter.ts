import type { LocationQuery } from "#vue-router";

export const useFilter = (data: any, filter: LocationQuery) => {
    console.log(data);
    console.log(filter);
    console.log("filter")
    return data;

};