

  export async function onRequest(context) {
    // Create a prepared statement with our query
    const ps = context.env.TheHysteria.prepare('SELECT * from players');
    const data = await ps.first();
  
    return Response.json(data);
  }