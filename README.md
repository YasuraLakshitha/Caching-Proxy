# Caching-Proxy

**Project URL**: https://roadmap.sh/projects/caching-server

This project implements a **Caching-proxy** server that fetches data from the public API `https://dummyjson.com` and caches the result to the root URL.

**Project Overview**

- **Fetches Data**: The server fetches data from the API at `http://dummyjson.com`.
- **API**: The origin URL for fetching the data is configured as `http://localhost:${port}/${resource}`.
-  **Port Configuration**: The port is configurable, and the default is `3000`
