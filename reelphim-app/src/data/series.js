import supabase from "../config/supabaseclient.js";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q";

const fetchSeriesData = async (seriesId) => {
    const url = `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Failed to fetch series data: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching series data for TMDB ID ${seriesId}:`, error);
      return null;
    }
  };
  
const fetchSeasonData = async (seriesId, seasonNumber) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Failed to fetch season data: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching season data for series ${seriesId}, season ${seasonNumber}:`, error);
    return null;
  }
};

const getIdSeries = async (idContent) => {
    const { data, error } = await supabase
      .from("series")
      .select("id_series")
      .eq("id_series", idContent)
      .single();
  
    if (error) {
      console.error(`Error fetching id_series for id_content ${idContent}:`, error);
      return null;
    }
  
    return data.id_series;
};
  
const updateSeasonCount = async (idSeries, seasonCount) => {
  try {
    const { data, error } = await supabase
      .from("series")
      .update({ season_count: seasonCount })
      .eq("id_series", idSeries);

    if (error) {
      console.error(`Error updating season_count for id_series ${idSeries}:`, error);
    } else {
      console.log(`Updated season_count for id_series ${idSeries}:`, data);
    }
  } catch (error) {
    console.error("Error updating season_count:", error);
  }
};

const insertSeason = async (seriesId, seasonData) => {
  try {
    const seasonInsert = {
      series_id: seriesId,
      season_number: seasonData.season_number,
      overview: seasonData.overview || "No overview available",
      production_year: seasonData.air_date
        ? new Date(seasonData.air_date).getFullYear()
        : null,
    };

    const { data, error } = await supabase.from("season").insert([seasonInsert]).select("*");

    if (error) {
      console.error(`Error inserting season for series_id ${seriesId}:`, error);
      return null;
    }

    if (!data || data.length === 0) {
      console.error("No data returned after inserting season. Check your Supabase setup.");
      return null;
    }

    console.log(`Inserted season for series_id ${seriesId}:`, data[0]);
    return data[0].id_season; // Trả về id_season
  } catch (error) {
    console.error("Error inserting season:", error);
    return null;
  }
};

const insertEpisode = async (seriesId, idSeason, episodeData) => {
  try {
    const episodeInsert = {
      episode_title: episodeData.name,
      overview: episodeData.overview,
      season: idSeason, // Liên kết với id_season
      path_to_file: null, // Đường dẫn video
      number_of_episode: episodeData.episode_number,
      series_id: seriesId, // Liên kết với series_id
      duration: episodeData.runtime || null,
      poster: episodeData.still_path
        ? `https://image.tmdb.org/t/p/w500${episodeData.still_path}`
        : null,
    };

    const { data, error } = await supabase.from("episode").insert([episodeInsert]);

    if (error) {
      console.error(`Error inserting episode for id_season ${idSeason}:`, error);
    } else {
      console.log(`Inserted episode for id_season ${idSeason}:`, data);
    }
  } catch (error) {
    console.error("Error inserting episode:", error);
  }
};

const processSeriesData = async (idContent, tmdbId) => {
  // Step 1: Lấy id_series từ bảng series
  const idSeries = await getIdSeries(idContent);
  if (!idSeries) {
    console.error(`No id_series found for id_content ${idContent}`);
    return;
  }

  // Step 2: Fetch series data từ TMDB
  const seriesData = await fetchSeriesData(tmdbId);
  if (!seriesData) return;

  // Step 3: Cập nhật season_count trong series
  await updateSeasonCount(idSeries, seriesData.number_of_seasons);

  // Step 4: Thêm dữ liệu vào bảng season và episode
  for (const season of seriesData.seasons) {
    const idSeason = await insertSeason(idSeries, season);

    if (idSeason) {
      const seasonData = await fetchSeasonData(tmdbId, season.season_number);
      if (seasonData && seasonData.episodes) {
        for (const episode of seasonData.episodes) {
          await insertEpisode(idSeries, idSeason, episode);
        }
      }
    }
  }
};

const idContent = 48;
const tmdb_id = 62741;
processSeriesData(idContent, tmdb_id)