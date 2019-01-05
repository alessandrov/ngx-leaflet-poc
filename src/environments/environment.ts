export const environment = {
  production: false,

  platformUrl: 'http://localhost:8080/coordinates',
  predefinedLocationUrl: 'http://localhost:8080/location',

  osm_map_startup_zoom_level: 4,
  osm_map_startup_latitude: 41.890251,
  osm_map_startup_longitude: 12.492373,

  osm_url_template: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osm_attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',

  line_chart_height: 340,
  line_chart_width: 400,
  bar_chart_height: 340,
  bar_chart_width: 400,

  bar_chart_axis_y_min: -180,
  bar_chart_axis_y_max: 180,
  line_chart_axis_y_min: -180,
  line_chart_axis_y_max: 180,

  marker_icon_size_height: 25,
  marker_icon_size_width: 41,
  marker_icon_anchor_height: 13,
  marker_icon_anchor_width: 41,

  marker_icon_url: 'leaflet/marker-icon.png',
  marker_shadow_url: 'leaflet/marker-shadow.png',
};
