var simplemaps_usmap_mapdata = {

    main_settings: {
        //General settings
        width: 'responsive',
        background_color: '#FFFFFF',
        border_color: '#ffffff',
        pop_ups: 'off', //on_click, on_hover, or detect

        //State defaults        
        state_color: '#88A4BC',
        state_hover_color: '#3B729F',
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
        label_color: '#d5ddec',
        label_hover_color: '#d5ddec',
        label_size: 22,
        label_font: 'Arial',
        hide_labels: 'yes',
        hide_eastern_labels: 'no',

        //Zoom settings
        zoom: 'yes', //use default regions		
        back_image: 'no', //Use image instead of arrow for back zoom				
        arrow_color: '#3B729F',
        arrow_color_border: '#88A4BC',
        initial_back: 'no', //Show back button when zoomed out and do this JavaScript upon click		
        initial_zoom: -1, //-1 is zoomed out, 0 is for the first continent etc	
        initial_zoom_solo: 'no', //hide adjacent states when starting map zoomed in
        region_opacity: 1,
        region_hover_opacity: .6,
        zoom_out_incrementally: 'yes', // if no, map will zoom all the way out on click
        zoom_percentage: .99,

        //Advanced settings
        div: 'usmap',
        auto_load: 'no',
        fade_time: 0.5 //time to fade out		        

    },

    state_specific: {},

    locations: {
        "0": { //must give each location an id, so that you can reference it later
            name: "New York",
            lat: 40.71,
            lng: -74.00,
            description: 'default',
            color: 'default',
            url: 'default',
            type: 'default',
            size: 'default' //Note:  You must omit the comma after the last property in an object to prevent errors in internet explorer.
        },
        1: {
            name: 'Anchorage',
            lat: 61.2180556,
            lng: -149.9002778,
            color: 'default',
            type: 'circle'
        }
    },

    labels: {
        "HI": {
            color: 'default',
            hover_color: 'default',
            font_family: 'default',
            pill: 'yes',
            width: 'default',
        }
    }

}