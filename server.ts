// server.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

console.log("HTTP webserver running. Access it at: http://localhost:8000/");

serve(async (req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;

  try {
    const file = await Deno.readFile("." + pathname);
    const contentType = getContentType(pathname);
    return new Response(file, {
      status: 200,
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return new Response("404 - File Not Found", { status: 404 });
  }
});

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "text/plain";
}
