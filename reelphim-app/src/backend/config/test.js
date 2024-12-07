/* import supabase from "../config/supabaseclient.js"; // Supabase client config

// Fetch runtime from TMDB API
const fetchRuntimeFromTMDB = async (tmdbId) => {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q`,
    },
  };

  try {
    const response = await fetch(url, options);
    const movieData = await response.json();

    // Check if runtime exists
    if (!movieData.runtime) {
      console.warn(`No runtime found for movie with TMDB ID ${tmdbId}`);
      return null;
    }

    return movieData.runtime;
  } catch (error) {
    console.error(`Error fetching runtime for TMDB ID ${tmdbId}:`, error);
    return null;
  }
};

// Update duration in the film table
const updateFilmDuration = async (tmdbId, filmId) => {
  const runtime = await fetchRuntimeFromTMDB(tmdbId);
  if (runtime === null) {
    console.warn(`Skipping update for film ID ${filmId} (TMDB ID: ${tmdbId})`);
    return;
  }

  try {
    const { data, error } = await supabase
      .from("film")
      .update({ duration: runtime })
      .eq("id_film", filmId);

    if (error) {
      console.error(`Error updating film duration for film ID ${filmId}:`, error);
    } else {
      console.log(`Successfully updated duration for film ID ${filmId}: ${runtime} minutes`);
    }
  } catch (error) {
    console.error(`Unexpected error updating duration for film ID ${filmId}:`, error);
  }
};

// Example usage
const tmdbFilmMappings = [
    { tmdbId: 1241982, filmId: 1 },
    { tmdbId: 912649, filmId: 2 },
    { tmdbId: 1100782, filmId: 3 },
    { tmdbId: 1184918, filmId: 4 },
    { tmdbId: 402431, filmId: 5 },
    { tmdbId: 558449, filmId: 6 },
    { tmdbId: 592983, filmId: 7 },
    { tmdbId: 1118031, filmId: 8 },
    { tmdbId: 1034541, filmId: 9 },
    { tmdbId: 278, filmId: 10 },
    { tmdbId: 238, filmId: 11 },
    { tmdbId: 240, filmId: 12 },
    { tmdbId: 424, filmId: 13 },
    { tmdbId: 389, filmId: 14 },
    { tmdbId: 129, filmId: 15 },
    { tmdbId: 19404, filmId: 16 },
    { tmdbId: 155, filmId: 17 }
];

(async () => {
  for (const mapping of tmdbFilmMappings) {
    await updateFilmDuration(mapping.tmdbId, mapping.filmId);
  }
})();
 */
import supabase from "./supabaseClient";
// Fetch the total number of seasons for a series
const fetchSeasonCount = async (seriesId) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q`
    },
  };

  try {
    const response = await fetch(url, options);
    const seriesData = await response.json();

    if (!seriesData.number_of_seasons) {
      console.warn(`No seasons found for series ID ${seriesId}`);
      return 0;
    }

    return seriesData.number_of_seasons;
  } catch (error) {
    console.error(`Error fetching season count for series ID ${seriesId}:`, error);
    return 0;
  }
};

// Fetch episode data from TMDB API for a specific season
const fetchEpisodesFromSeason = async (seriesId, seasonNumber) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q`
    },
  };

  try {
    const response = await fetch(url, options);
    const seasonData = await response.json();

    if (!seasonData.episodes) {
      console.warn(`No episodes found for series ID ${seriesId}, season ${seasonNumber}`);
      return [];
    }

    return seasonData.episodes.map((episode) => ({
      episodeNumber: episode.episode_number,
      runtime: episode.runtime,
    }));
  } catch (error) {
    console.error(`Error fetching episodes for series ID ${seriesId}, season ${seasonNumber}:`, error);
    return [];
  }
};

// Update duration in the episode table for a specific episode
const updateEpisodeDuration = async (seriesId, seasonNumber, episodeNumber, runtime) => {
  try {
    const { data, error } = await supabase
      .from("episode")
      .update({ duration: runtime })
      .match({
        series_id: seriesId,
        season: seasonNumber,
        number_of_episode: episodeNumber,
      });

    if (error) {
      console.error(
        `Error updating duration for series ID ${seriesId}, season ${seasonNumber}, episode ${episodeNumber}:`,
        error
      );
    } else {
      console.log(
        `Successfully updated duration for series ID ${seriesId}, season ${seasonNumber}, episode ${episodeNumber}: ${runtime} minutes`
      );
    }
  } catch (error) {
    console.error(
      `Unexpected error updating duration for series ID ${seriesId}, season ${seasonNumber}, episode ${episodeNumber}:`,
      error
    );
  }
};

// Process episodes for a specific season
const processSeasonEpisodes = async (seriesId, seasonNumber) => {
  const episodes = await fetchEpisodesFromSeason(seriesId, seasonNumber);

  if (episodes.length === 0) {
    console.warn(`No episodes to process for series ID ${seriesId}, season ${seasonNumber}`);
    return;
  }

  for (const episode of episodes) {
    const { episodeNumber, runtime } = episode;

    if (runtime !== null) {
      await updateEpisodeDuration(seriesId, seasonNumber, episodeNumber, runtime);
    } else {
      console.warn(
        `No runtime available for series ID ${seriesId}, season ${seasonNumber}, episode ${episodeNumber}`
      );
    }
  }
};

// Process all seasons for a specific series
const processAllSeasons = async (seriesId) => {
  const seasonCount = await fetchSeasonCount(seriesId);

  if (seasonCount === 0) {
    console.warn(`No seasons to process for series ID ${seriesId}`);
    return;
  }

  for (let seasonNumber = 1; seasonNumber <= seasonCount; seasonNumber++) {
    console.log(`Processing episodes for series ID ${seriesId}, season ${seasonNumber}...`);
    await processSeasonEpisodes(seriesId, seasonNumber);
  }
};

// Start processing for a specific series
(async () => {
  const seriesId = 1396; // Replace with the actual TMDB series ID
  await processAllSeasons(seriesId);

  console.log("Completed processing all episodes for the series.");
})();
    