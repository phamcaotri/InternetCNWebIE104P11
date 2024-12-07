/* const fetchActorsAndDirectors = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
    },
  };

  try {
    const response = await fetch(url, options);
    const { cast, crew } = await response.json();

    // Lấy danh sách diễn viên
    const actors = cast.map((actor) => ({
      tmdb_id: actor.id,
      name: actor.name.split(" ")[0] || actor.name, // Lấy tên
      lastname: actor.name.split(" ").slice(1).join(" ") || "", // Lấy họ
      character_name: actor.character, // Lấy họ
      photo_path: actor.profile_path,
    }));

    // Lấy danh sách đạo diễn
    const directors = crew
      .filter((member) => member.job === "Director")
      .map((director) => ({
        tmdb_id: director.id,
        name: director.name.split(" ")[0] || director.name, // Lấy tên
        lastname: director.name.split(" ").slice(1).join(" ") || "", // Lấy họ
        role: "director",
        photo_path: director.profile_path,
      }));

    return { actors, directors };
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    return { actors: [], directors: [] };
  }
};

const insertActors = async (people) => {
  const actorIds = [];

  for (const person of people) {
    const { tmdb_id, name, lastname, photo_path } = person;

    // Kiểm tra nếu diễn viên/đạo diễn đã tồn tại
    const { data: existingActor, error: fetchError } = await supabase
      .from('actor')
      .select('id_actor')
      .eq('id_tmdb', tmdb_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking actor:', fetchError);
      continue;
    }

    if (existingActor) {
      actorIds.push(existingActor.id_actor);
      continue;
    }

    // Chèn mới
    const newActor = {
      id_tmdb: tmdb_id,
      name,
      lastname,
      photo_path: photo_path ? `https://image.tmdb.org/t/p/w500${photo_path}` : null,
    };

    const { data, error } = await supabase.from('actor').insert([newActor]).select('*');
    if (error) {
      console.error('Error inserting actor:', error);
    } else if (data && data.length > 0) {
      actorIds.push(data[0].id_actor);
    } else {
      console.error(`No data returned after inserting actor with TMDB ID ${tmdb_id}`);
    }
  }

  return actorIds;
};


const insertContentActor = async (contentId, people, role) => {
  for (const person of people) {
    const { tmdb_id, character_name } = person;

    // Tra cứu actor_id từ bảng actor
    const { data: actor, error: fetchError } = await supabase
      .from('actor')
      .select('id_actor')
      .eq('id_tmdb', tmdb_id)
      .single();

    if (fetchError) {
      console.error(`Error fetching actor with TMDB ID ${tmdb_id}:`, fetchError);
      continue;
    }

    if (!actor) {
      console.error(`Actor with TMDB ID ${tmdb_id} not found in database.`);
      continue;
    }

    const actorId = actor.id_actor;

    // Kiểm tra xem quan hệ đã tồn tại với vai trò cụ thể
    const { data: existingRelation, error: relationError } = await supabase
      .from('content_actor')
      .select('content_id, actor_id, role')
      .eq('content_id', contentId)
      .eq('actor_id', actorId)
      .eq('role', role)
      .single();

    if (relationError && relationError.code !== 'PGRST116') {
      console.error(`Error checking content-actor relationship:`, relationError);
      continue;
    }

    if (existingRelation) {
      console.log(
        `Content-actor relationship already exists for content_id: ${contentId}, actor_id: ${actorId}, role: ${role}`
      );
      continue;
    }

    // Tạo đối tượng để chèn vào content_actor
    const contentActor = {
      content_id: contentId,
      actor_id: actorId,
      role, // Vai trò: actor hoặc director
      character_name: role === 'actor' ? character_name : null,
    };

    // Chèn vào bảng content_actor
    const { data, error } = await supabase.from('content_actor').insert([contentActor]);

    if (error) {
      console.error(`Error inserting content-actor relationship for TMDB ID ${tmdb_id}:`, error);
    } else {
      console.log(`Inserted content-actor relationship:`, data);
    }
  }
};

/* const processActorsAndDirectors = async (tmdbId, contentId) => {
  const { actors, directors } = await fetchActorsAndDirectors(tmdbId);

  // Lưu diễn viên vào bảng actor
  const actorIds = await insertActors(actors);

  // Lưu đạo diễn vào bảng actor
  const directorIds = await insertActors(directors);

  // Kết nối content với actors
  await insertContentActor(contentId, actors, "actor");

  // Kết nối content với directors
  await insertContentActor(contentId, directors, "director");
};

// Gọi hàm xử lý
processActorsAndDirectors(155, 17); // Thay 1241982 bằng TMDB ID và 23 bằng Content ID
 */


/* //import actor for series
// Fetch actors for a specific series using /aggregate_credits API
const fetchActorsForSeries = async (seriesId) => {
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/aggregate_credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q`,
    },
  };

  try {
    const response = await fetch(url, options);
    const { cast, crew } = await response.json();

    // Lọc diễn viên dựa trên total_episode_count >= 15
    const filteredActors = cast.filter((actor) => actor.total_episode_count >= 15);

    // Chuẩn hóa danh sách diễn viên
    const actors = filteredActors.map((actor) => ({
      tmdb_id: actor.id,
      name: actor.name.split(" ")[0] || actor.name,
      lastname: actor.name.split(" ").slice(1).join(" ") || "",
      total_episode_count: actor.total_episode_count,
      character_name: actor.roles.map((role) => role.character).join(", "),
      photo_path: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : null,
    }));

    // Lọc và chuẩn hóa danh sách directors
    const directors = crew
      .filter((crewMember) => crewMember.job === "Director")
      .map((director) => ({
        tmdb_id: director.id,
        name: director.name.split(" ")[0] || director.name,
        lastname: director.name.split(" ").slice(1).join(" ") || "",
        photo_path: director.profile_path
          ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
          : null,
      }));

    console.log(`Fetched ${actors.length} actors and ${directors.length} directors for series ID ${seriesId}`);
    return { actors, directors };
  } catch (error) {
    console.error(`Error fetching aggregate credits for series ${seriesId}:`, error);
    return { actors: [], directors: [] };
  }
};



// Insert actors into the actor table
const insertActors = async (people) => {
  const actorIdMap = {};

  for (const person of people) {
    const { tmdb_id, name, lastname, photo_path } = person;

    // Kiểm tra nếu diễn viên/đạo diễn đã tồn tại
    const { data: existingActor, error: fetchError } = await supabase
      .from("actor")
      .select("id_actor")
      .eq("id_tmdb", tmdb_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking actor:", fetchError);
      continue;
    }

    if (existingActor) {
      actorIdMap[tmdb_id] = existingActor.id_actor;
      continue;
    }

    // Chèn mới
    const newActor = {
      id_tmdb: tmdb_id,
      name,
      lastname,
      photo_path,
    };

    const { data, error } = await supabase.from("actor").insert([newActor]).select("*");
    if (error) {
      console.error(`Error inserting actor with TMDB ID ${tmdb_id}:`, error);
    } else if (data && data.length > 0) {
      actorIdMap[tmdb_id] = data[0].id_actor;
    } else {
      console.error(`No data returned after inserting actor with TMDB ID ${tmdb_id}`);
    }
  }

  return actorIdMap;
};

// Insert relationships into the content_actor table
const insertContentActor = async (contentId, people, role) => {
  for (const person of people) {
    const { tmdb_id, character_name } = person;

    // Tra cứu actor_id từ bảng actor
    const { data: actor, error: fetchError } = await supabase
      .from("actor")
      .select("id_actor")
      .eq("id_tmdb", tmdb_id)
      .single();

    if (fetchError) {
      console.error(`Error fetching actor with TMDB ID ${tmdb_id}:`, fetchError);
      continue;
    }

    if (!actor) {
      console.error(`Actor with TMDB ID ${tmdb_id} not found in database.`);
      continue;
    }

    const actorId = actor.id_actor;

    // Kiểm tra quan hệ đã tồn tại chưa
    const { data: existingRelation, error: relationError } = await supabase
      .from("content_actor")
      .select("content_id, actor_id, role")
      .eq("content_id", contentId)
      .eq("actor_id", actorId)
      .eq("role", role)
      .single();

    if (relationError && relationError.code !== "PGRST116") {
      console.error(`Error checking content-actor relationship:`, relationError);
      continue;
    }

    if (existingRelation) {
      console.log(
        `Content-actor relationship already exists for content_id: ${contentId}, actor_id: ${actorId}, role: ${role}`
      );
      continue;
    }

    // Tạo đối tượng để chèn vào content_actor
    const contentActor = {
      content_id: contentId,
      actor_id: actorId,
      role,
      character_name: role === "actor" ? character_name : null,
    };

    const { error } = await supabase.from("content_actor").insert([contentActor]);
    if (error) {
      console.error(`Error inserting content-actor relationship for TMDB ID ${tmdb_id}:`, error);
    } else {
      console.log(
        `Inserted content-actor relationship: content_id=${contentId}, actor_id=${actorId}, role=${role}`
      );
    }
  }
};

// Main function to process actors for all series in content
const processSeriesActors = async () => {
  try {
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

      console.log(`Processing series ID ${seriesId} with content ID ${contentId}`);

      const { actors, directors } = await fetchActorsForSeries(seriesId);

      // Lưu diễn viên và đạo diễn vào bảng actor
      await insertActors(actors);
      await insertActors(directors);

      // Kết nối content với actors
      await insertContentActor(contentId, actors, "actor");

      // Kết nối content với directors
      await insertContentActor(contentId, directors, "director");
    }
  } catch (error) {
    console.error("Error processing series actors and directors:", error);
  }
};

// Run the function
processSeriesActors();
 */
import supabase from "./supabaseClient";
//import director (creator) for series
const fetchDirectorsForSeries = async (seriesId) => {
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

    const { created_by: creators } = seriesData;

    // Chuẩn hóa danh sách Directors từ "created_by"
    const directors = creators.map((creator) => ({
      tmdb_id: creator.id,
      name: creator.name.split(" ")[0] || creator.name,
      lastname: creator.name.split(" ").slice(1).join(" ") || "",
      photo_path: creator.profile_path
        ? `https://image.tmdb.org/t/p/w500${creator.profile_path}`
        : null,
    }));

    console.log(`Fetched ${directors.length} directors for series ID ${seriesId}`);
    return directors;
  } catch (error) {
    console.error(`Error fetching series directors for series ID ${seriesId}:`, error);
    return [];
  }
};

const insertDirectors = async (directors) => {
  const directorIds = [];

  for (const director of directors) {
    const { tmdb_id, name, lastname, photo_path } = director;

    // Kiểm tra nếu director đã tồn tại trong bảng actor
    const { data: existingDirector, error: fetchError } = await supabase
      .from("actor")
      .select("id_actor")
      .eq("id_tmdb", tmdb_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(`Error checking director with TMDB ID ${tmdb_id}:`, fetchError);
      continue;
    }

    let directorId;

    if (existingDirector) {
      directorId = existingDirector.id_actor;
    } else {
      // Thêm mới director vào bảng actor
      const newDirector = {
        id_tmdb: tmdb_id,
        name,
        lastname,
        photo_path,
      };

      const { data, error } = await supabase.from("actor").insert([newDirector]).select("*");
      if (error) {
        console.error(`Error inserting director with TMDB ID ${tmdb_id}:`, error);
        continue;
      } else if (data && data.length > 0) {
        directorId = data[0].id_actor;
      }
    }

    if (directorId) directorIds.push(directorId);
  }

  return directorIds;
};

const linkDirectorsToContent = async (contentId, directorIds) => {
  for (const directorId of directorIds) {
    // Kiểm tra xem quan hệ đã tồn tại chưa
    const { data: existingRelation, error: relationError } = await supabase
      .from("content_actor")
      .select("content_id, actor_id, role")
      .eq("content_id", contentId)
      .eq("actor_id", directorId)
      .eq("role", "director")
      .single();

    if (relationError && relationError.code !== "PGRST116") {
      console.error("Error checking content-actor relationship:", relationError);
      continue;
    }

    if (existingRelation) {
      console.log(`Director already linked to content ID ${contentId}`);
      continue;
    }

    // Tạo liên kết mới
    const contentDirector = {
      content_id: contentId,
      actor_id: directorId,
      role: "director",
      character_name: null, 
    };

    const { error } = await supabase.from("content_actor").insert([contentDirector]);
    if (error) {
      console.error(`Error linking director ID ${directorId} to content ID ${contentId}:`, error);
    } else {
      console.log(`Linked director ID ${directorId} to content ID ${contentId}`);
    }
  }
};

const processSeriesDirectors = async () => {
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

      console.log(`Processing series ID ${seriesId} with content ID ${contentId}`);

      // Fetch directors
      const directors = await fetchDirectorsForSeries(seriesId);

      // Insert directors into actor table
      const directorIds = await insertDirectors(directors);

      // Link directors to content
      await linkDirectorsToContent(contentId, directorIds);
    }
  } catch (error) {
    console.error("Error processing series directors:", error);
  }
};

processSeriesDirectors()
