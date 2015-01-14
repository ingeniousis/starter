/* Global variables for storing the map data*/
var simplemaps_usmap_mapdata = {};
var simplemaps_canadamap_mapdata = {};
var simplemaps_worldmap_mapdata = {};

SetGlobalSettings(simplemaps_usmap_mapdata);
simplemaps_usmap_mapdata.main_settings.div = 'map';
simplemaps_usmap_mapdata.state_specific = {};

simplemaps_usmap_mapdata.regions = {
    '0': {
        name: 'NewEngland',
        states: ["ME", "NH", "VT", "MA", "CT", "RI", "NY", "NJ", "DE", "MD"]
    }
};

SetGlobalSettings(simplemaps_canadamap_mapdata);
SetGlobalSettings(simplemaps_canadamap_mapdata);

/* Sets common settings for each map region */
function SetGlobalSettings(mapData) {
    var main_settings = {

        //General settings
        width: 'responsive',
        background_color: '#FFFFFF',
        border_color: '#ffffff',
        pop_ups: 'off',

        //State defaults        
        state_color: '#99b9b9',
        state_hover_color: '#99b9b9',

        state_url: '',
        border_size: 1.5,

        //Location defaults        
        location_color: '#FF0067',
        location_opacity: .8,
        location_hover_opacity: 1,
        location_url: '',
        location_size: 25,
        location_type: 'circle', // circle, square, image        
        location_border_color: '#FFFFFF',
        location_border: 2,
        location_hover_border: 2.5,

        //Labels        
        hide_labels: 'yes',

        //Zoom settings
        zoom: 'yes', //use default regions		
        back_image: 'no', //Use image instead of arrow for back zoom				
        arrow_color: '#3B729F',
        arrow_color_border: '#88A4BC',
        initial_back: 'no', //Show back button when zoomed out and do this JavaScript upon click		
        initial_zoom: '-1', //-1 is zoomed out, 0 is for the first continent etc	
        initial_zoom_solo: 'no', //hide adjacent states when starting map zoomed in
        zoom_time: '3',
        region_opacity: 1,
        region_hover_opacity: .6,
        adjacent_opacity: 1,

        //Advanced settings        
        auto_load: 'no',
        fade_time: 0 //time to fade out	
    };

    mapData.main_settings = main_settings;
}