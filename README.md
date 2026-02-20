

SpinSoul 🎵
================

See the App!
------------ 
https://spinsoul-json-server.onrender.com


Description:
-----------
SpinSoul is a music collection management app that allows
users to explore, create, and organize vinyl releases and artists. Users
can import releases directly from the Discogs API, manage their personal
catalog, and filter records by genre, country, and search queries.

Client Repo: https://github.com/mariapujolpol/Spinsoul-project

Server Repo: https://github.com/mauricioalonsorojasm-oss/spinsoul-json-server

Technologies, Libraries & APIs used
----------------------------------
- React
- React Router DOM
- Axios
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- JSON Server (mock REST API)
- Discogs API


Backlog Functionalities
----------------------
- User authentication (login/signup)
- Favorites system for releases
- Pagination for large datasets
- Server-side filtering instead of client-side filtering
- Edit release functionality
- Dark/Light theme toggle
- Real backend database (MongoDB / PostgreSQL)
- Rate limiting and caching for Discogs API
- Sorting options (year, rating, alphabetical)
- Artist image fallback handling


Architecture Overview
---------------------
SpinSoul uses a client-server separation:

Client (React + Vite)
- Handles routing (React Router)
- Handles UI state (search query, filters, loading states)
- Performs client-side filtering for artists and releases
- Connects to backend API using Axios
- Manages the Discogs import flow (search -> pick -> prefill form)

Server (JSON Server + API routes)
- Stores artists and releases as separate collections
- Provides REST endpoints:
  - /artists
  - /releases
  - /releases?artistId=...
- Proxies Discogs API requests through server-side routes to keep DISCOGS_TOKEN private:
  - /api/discogs-search
  - /api/discogs-release
- Normalizes Discogs responses into UI-friendly objects

Data Model (simplified)
- artists:
  - id, name, country, imageUrl, bio
- releases:
  - id, title, year, genre, rating, review, coverUrl, artistId


Discogs Integration Flow
------------------------
1) User opens: /releases/import
2) User types a query (artist + release)
3) Client calls: GET /api/discogs-search?q=...
4) User selects a result
5) Client calls: GET /api/discogs-release?id=...
6) Client maps the response and navigates to /releases/new with router state
7) AddRecordPage reads location.state and pre-fills the form
8) User edits and saves -> POST /releases


Client Structure
================

User Stories
------------
| Feature         | As a user I want to...                           | So that I can...                        |
|-----------------|--------------------------------------------------|-----------------------------------------|
| 404             | 404 page when I visit a route that doesn’t exist | understand it was a wrong URL |
| homepage        | access the homepage                              | discover suggested artists and releases |
| search          | search artists and releases globally             | find items quickly |
| filter genre    | filter releases by genre                         | narrow down results |
| filter country  | filter artists/releases by country               | explore by location |
| releases list   | see all releases in a grid                       | browse my collection |
| release details | open a release details page                      | view full metadata and review |
| artists list    | see all artists                                  | browse artist catalog |
| artist details  | open an artist details page                      | view artist info and their releases |
| create release  | create a new release manually                    | add records to my collection |
| delete release  | delete a release from my collection              | keep my catalog clean |
| import Discogs  | search Discogs and import a release              | save time adding records |
| rating          | rate a release from 1 to 5 stars                 | track my personal score |
| loading states  | see loading indicators during fetches            | understand the app is working |


React Router Routes (React App)
-------------------------------
| Path                 | Page               | Components              | Behavior                                              |
|----------------------|--------------------|-------------------------|-------------------------------------------------------|
| /                    | HomePage           | ReleaseCard, ArtistCard | Shows suggested releases and artists with filters |
| /releases            | ReleasesListPage   | ReleaseCard             | Shows all releases with search + delete |
| /releases/new        | AddRecordPage      | StarRating              | Create new release form (also prefilled after import) |
| /releases/import     | ImportDiscogsPage  | SearchBar               | Search Discogs and import a release |
| /releases/:releaseId | ReleaseDetailsPage | StarRating              | Shows release details |
| /artists             | ArtistsListPage    | ArtistCard              | Shows all artists |
| /artists/:artistId   | ArtistDetailsPage  | ReleaseCard             | Shows artist info + related releases |
| /about               | AboutPage          | —                       | Project information |
| *                    | NotFoundPage       | —                       | 404 page |


Other Components
----------------
- Navbar (route-aware, dynamic search & add button)
- Footer
- SearchBar (controlled input component)
- StarRating (interactive + read-only rating component)
- ReleaseCard
- ArtistCard
- LoadingOverlay


Links
=====

Collaborators
------------

Maria Pol Pujol
https://https://github.com/mariapujolpol

Mauricio Rojas 
https://github.com/mauricioalonsorojasm-oss


Project
-------
Repository Link Client:
https://github.com/mariapujolpol/Spinsoul-project

Repository Link Server:
https://github.com/mauricioalonsorojasm-oss/spinsoul-json-server

Deploy Link:
https://spinsoul-json-server.onrender.com
