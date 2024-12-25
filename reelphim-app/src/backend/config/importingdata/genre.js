/*
//Genre:
const fetchAndImportGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const { genres } = await response.json();
  
      for (const genre of genres) {
        const { id: id, name } = genre;
  
        // Kiểm tra if exist
        const { data: existingGenre, error: fetchError } = await supabase
          .from('genre')
          .select('id_genre')
          .eq('id_tmdb', id)
          .single();
  
        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error checking genre:', fetchError);
          continue;
        }
  
        if (existingGenre) {
          console.log(`Genre already exists: ${existingGenre.id_genre}`);
          continue;
        }
  
        // Chèn thể loại mới
        const newGenre = {id_tmdb: id, name };
        const { data, error } = await supabase.from('genre').insert([newGenre]);
        if (error) {
          console.error('Error inserting genre:', error);
        } else {
          console.log('Inserted genre:', data);
        }
      }
    } catch (error) {
      console.error('Error fetching genres from TMDB:', error);
    }
  };

//content-genre
const fetchGenresForMovie = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q', // Thay YOUR_API_KEY bằng Bearer Token của bạn
      },
    };
  
    try {
      const response = await fetch(url, options);
  
      // Kiểm tra trạng thái
      if (!response.ok) {
        console.error(`API Error: ${response.status} - ${response.statusText}`);
        return [];
      }
  
      const movie = await response.json();
  
      // Trích xuất danh sách id từ genres
      const genreIds = movie.genres?.map((genre) => genre.id) || [];
      return genreIds; // Trả về danh sách genre_ids
    } catch (error) {
      console.error(`Error fetching genres for movie ID ${movieId}:`, error);
      return [];
    }
  };
  
  
    const getContentId = async (tmdbId) => {
        const { data: content, error } = await supabase
          .from('content')
          .select('id_content')
          .eq('id_tmdb', tmdbId)
          .single();
      
        if (error) {
          console.error(`Error fetching content for TMDB ID ${tmdbId}:`, error);
          return null;
        }
      
        return content.id_content;
      };      

      const getGenreId = async (tmdbGenreId) => {
        const { data: genre, error } = await supabase
          .from('genre')
          .select('id_genre')
          .eq('id_tmdb', tmdbGenreId)
          .single();
      
        if (error) {
          console.error(`Error fetching genre for TMDB ID ${tmdbGenreId}:`, error);
          return null;
        }
      
        return genre.id_genre;
      };      

      const insertContentGenres = async (contentId, genreIds) => {
        for (const genreId of genreIds) {
          const { data, error } = await supabase.from('content_genre').insert([
            { content_id: contentId, genre_id: genreId },
          ]);
      
          if (error) {
            console.error(`Error inserting content-genre relationship:`, error);
          } else {
            console.log(`Inserted content-genre relationship:`, data);
          }
        }
      };
  
      const processContentGenres = async (tmdbId) => {
        const genreIdsFromTmdb = await fetchGenresForMovie(tmdbId);
      
        console.log("Fetched genreIdsFromTmdb:", genreIdsFromTmdb); 

        if (!Array.isArray(genreIdsFromTmdb)) {
          console.error("Error: genreIdsFromTmdb is not an array.");
          return;
        }
      
        const contentId = await getContentId(tmdbId);
        if (!contentId) {
          console.error(`Content with TMDB ID ${tmdbId} not found.`);
          return;
        }
      
        const genreIds = [];
        for (const tmdbGenreId of genreIdsFromTmdb) {
          const genreId = await getGenreId(tmdbGenreId);
          if (genreId) {
            genreIds.push(genreId);
          }
        }
      
        await insertContentGenres(contentId, genreIds);
      };
      
      processContentGenres(637);
      
      
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q";

const fetchGenresFromTMDB = async () => {
  const url = "https://api.themoviedb.org/3/genre/tv/list?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch genres from TMDB: ${response.statusText}`);
    }

    const { genres } = await response.json();
    console.log("Fetched genres from TMDB:", genres);
    return genres;
  } catch (error) {
    console.error("Error fetching genres from TMDB:", error);
    return [];
  }
};

const insertGenresToDB = async (genres) => {
  for (const genre of genres) {
    // Kiểm tra xem genre đã tồn tại chưa
    const { data: existingGenre, error: fetchError } = await supabase
      .from("genre")
      .select("id_genre")
      .eq("id_tmdb", genre.id)
      .single();

    if (fetchError && fetchError.code === "PGRST116") {
      // Nếu genre không tồn tại, thêm mới
      const { data: insertedGenre, error: insertError } = await supabase
        .from("genre")
        .insert([{ id_tmdb: genre.id, name: genre.name }])
        .select("id_genre");

      if (insertError) {
        console.error(`Error inserting genre with TMDB ID ${genre.id}:`, insertError);
      } else {
        console.log(`Inserted genre: ${insertedGenre}`);
      }
    } else if (fetchError) {
      console.error(`Error checking genre with TMDB ID ${genre.id}:`, fetchError);
    } else {
      console.log(`Genre with TMDB ID ${genre.id} already exists.`);
    }
  }
};

const processGenres = async () => {
  // Fetch genres từ TMDB
  const genres = await fetchGenresFromTMDB();

  // Insert genres vào DB
  if (genres.length > 0) {
    await insertGenresToDB(genres);
  } else {
    console.log("No genres fetched from TMDB.");
  }
};

processGenres();*/
import supabase from "../supabaseClient";
const fetchGenresForSeries = async (seriesId) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
    },
  };

  try {
    const response = await fetch(url, options);
    const seriesData = await response.json();

    const genres = seriesData.genres.map((genre) => ({
      id_tmdb: genre.id,
      name: genre.name,
    }));

    console.log(`Fetched ${genres.length} genres for series ID ${seriesId}`);
    return genres;
  } catch (error) {
    console.error(`Error fetching genres for series ID ${seriesId}:`, error);
    return [];
  }
};

const linkGenresToContent = async (contentId, genres) => {
  for (const genre of genres) {
    // Tra cứu id_genre từ bảng genre bằng id_tmdb
    const { data: existingGenre, error: fetchError } = await supabase
      .from("genre")
      .select("id_genre")
      .eq("id_tmdb", genre.id_tmdb)
      .single();

    if (fetchError) {
      console.error(`Error fetching genre with TMDB ID ${genre.id_tmdb}:`, fetchError);
      continue;
    }

    if (!existingGenre) {
      console.error(`Genre with TMDB ID ${genre.id_tmdb} not found in database.`);
      continue;
    }

    const genreId = existingGenre.id_genre;

    // Kiểm tra if exist
    const { data: existingRelation, error: relationError } = await supabase
      .from("content_genre")
      .select("content_id, genre_id")
      .eq("content_id", contentId)
      .eq("genre_id", genreId)
      .single();

    if (relationError && relationError.code !== "PGRST116") {
      console.error(`Error checking content-genre relationship:`, relationError);
      continue;
    }

    if (existingRelation) {
      console.log(`Genre ID ${genreId} already linked to content ID ${contentId}`);
      continue;
    }

    // Tạo liên kết mới
    const contentGenre = {
      content_id: contentId,
      genre_id: genreId,
    };

    const { error } = await supabase.from("content_genre").insert([contentGenre]);

    if (error) {
      console.error(`Error linking genre ID ${genreId} to content ID ${contentId}:`, error);
    } else {
      console.log(`Linked genre ID ${genreId} to content ID ${contentId}`);
    }
  }
};

const processGenresForAllSeries = async () => {
  try {
    // Lấy danh sách series từ bảng content
    const { data: seriesList, error } = await supabase
      .from("content")
      .select("id_content, id_tmdb")
      .eq("content_type", "series");

    if (error) {
      console.error("Error fetching series:", error);
      return;
    }

    for (const series of seriesList) {
      const { id_content: contentId, id_tmdb: seriesId } = series;

      console.log(`Processing genres for series ID ${seriesId} with content ID ${contentId}`);

      // Fetch genres for series từ TMDB
      const genres = await fetchGenresForSeries(seriesId);

      // Link genres to content
      await linkGenresToContent(contentId, genres);
    }
  } catch (error) {
    console.error("Error processing genres for all series:", error);
  }
};

processGenresForAllSeries(); 
