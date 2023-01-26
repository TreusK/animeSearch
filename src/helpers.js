// @ts-check

import { useEffect, useState } from "react";

export function formIsEmpty(form) {
  // Go through every key and make sure it's falsy
  return Object.keys(form).every((key) => !form[key]);
}

// Convert new URLSearchParams(window.location.search) to an object
const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
};

const urlParamsObject = getUrlParams();

export function useSearchParams() {
  const [searchParams, _setSearchParams] = useState(urlParamsObject);

  // Listen for changes to the URL and update the params
  useEffect(() => {
    const handler = () => {
      _setSearchParams(getUrlParams());
    };
    window.addEventListener("popstate", handler);
    window.addEventListener("pushstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
      window.removeEventListener("pushstate", handler);
    };
  }, []);

  /** Updates the URL search params and pushes a new history entry */
  const setSearchParams = (newParams) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    window.history.pushState({}, "", `${window.location.pathname}?${params}`);
    window.dispatchEvent(new Event("pushstate"));
  };

  return { searchParams, setSearchParams };
}
