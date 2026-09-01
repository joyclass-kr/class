import fs from "node:fs/promises";

const riverFile = new URL("../learning/inquiry/korea-geography/data/major-rivers.geojson", import.meta.url);
const northernRivers = new Map([
  [2899525, "압록강"],
  [6970997, "두만강"],
  [3858130, "대동강"],
  [5454222, "청천강"]
]);
const lookupUrl = `https://nominatim.openstreetmap.org/lookup?osm_ids=${[...northernRivers.keys()].map((id) => `R${id}`).join(",")}&format=jsonv2&polygon_geojson=1`;

const response = await fetch(lookupUrl, {
  headers: { "User-Agent": "JoyclassKoreaGeography/1.0 (educational map)" }
});
if (!response.ok) throw new Error(`Nominatim lookup failed: HTTP ${response.status}`);

const lookupResults = await response.json();
const collection = JSON.parse(await fs.readFile(riverFile, "utf8"));
const retainedFeatures = collection.features.filter((feature) => ![...northernRivers.values()].includes(feature.properties?.name));
const fetchedFeatures = lookupResults.map((result) => ({
  type: "Feature",
  properties: {
    name: northernRivers.get(Number(result.osm_id)),
    source: "OpenStreetMap contributors via Nominatim",
    osmRelation: Number(result.osm_id)
  },
  geometry: result.geojson
}));

if (fetchedFeatures.length !== northernRivers.size || fetchedFeatures.some((feature) => !feature.properties.name || !/LineString$/.test(feature.geometry?.type || ""))) {
  throw new Error("Nominatim did not return every expected northern river relation.");
}

collection.features = [...retainedFeatures, ...fetchedFeatures];
await fs.writeFile(riverFile, `${JSON.stringify(collection)}\n`, "utf8");
console.log(`Updated ${riverFile.pathname} with ${collection.features.length} major rivers.`);
