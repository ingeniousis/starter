var simplemaps_canadamap_mapdata = {

	main_settings:{
		//General settings
		width: '700', //or #, eg '700'
		background_color: '#FFFFFF',	
		background_transparent: 'no',
		border_color: '#ffffff',
		pop_ups: 'detect', //on_click, on_hover, or detect

		//State defaults
		state_description:   'State description',
		state_color: '#88A4BC',
		state_hover_color: '#3B729F',
		state_url: 'http://simplemaps.com',
		border_size: 1.5,		
		all_states_inactive: 'no',
		all_states_zoomable: 'no',		
		
		//Location defaults
		location_description:  'Location description',
		location_color: '#FF0067',
		location_opacity: .8,
		location_hover_opacity: 1,
		location_url: '',
		location_size: 25,
		location_type: 'square', // circle, square, image
		location_image_source: 'frog.png', //name of image in the map_images folder		
		location_border_color: '#FFFFFF',
		location_border: 2,
		location_hover_border: 2.5,				
		all_locations_inactive: 'no',
		all_locations_hidden: 'no',
		
		//Labels
		label_color: '#d5ddec',	
		label_color: '#d5ddec',		
		label_size: 30,
		label_font: 'Arial',
		hide_labels: 'no',
		hide_eastern_labels: 'no',
		
		//Advanced settings - you probably can ignore these
		div: 'map',
		auto_load: 'yes',		
		url_new_tab: 'no', 
		images_directory: 'default', //e.g. 'map_images/'
		arrow_color: '#3B729F',
		arrow_color_border: '#88A4BC',
		back_image: 'no',   //Use image instead of arrow for back zoom
		initial_back: 'no', //Show back button when zoomed out and do this JavaScript upon click		
		popup_color: 'white',
		popup_opacity: .9,
		popup_shadow: 1,
		popup_corners: 5,
		popup_font: '12px/1.5 Verdana, Arial, Helvetica, sans-serif',
		popup_nocss: 'no', //use your own css		
		initial_zoom: -1,  //-1 is zoomed out, 0 is for the first continent etc	
		initial_zoom_solo: 'no', //hide adjacent states when starting map zoomed in
		link_text: '(Link)',  //Text mobile browsers will see for links
		zoom: 'yes', //use default regions
		zoom_out_incrementally: 'yes',  // if no, map will zoom all the way out on click
		zoom_percentage: .99,
		fade_time:  .1, //time to fade out
		zoom_speed: .5 //time to zoom between regions in seconds
	},
	
	state_specific:{		
		AB: {
				name: 'Alberta',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},
				
		BC: {
				name: 'British Columbia',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},		

		SK: {
				name: 'Saskatchewan',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},
				
		MB: {
				name: 'Manitoba',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},		
				
		ON: {
				name: 'Ontario',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},		
				
		QC: {
				name: 'Quebec',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},			

		NB: {
				name: 'New Brunswick',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},				

		PE: {
				name: 'Prince Edwards Island',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},				

		NS: {
				name: 'Nova Scotia',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},		
				
		NL: {
				name: 'Newfoundland',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
				},			
				
		NU: {
				name: 'Nunavut',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},			
				
		NT: {
				name: 'Northwest Territories',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		},			

		YT: {
				name: 'Yukon',
				description: 'default',
				color: 'default',
				hover_color: 'default',
				url: 'default'
		}
	},

	locations:{
		'0': {
			name: 'Toronto',
			lat:  43.653226,
			lng:  -79.3831843,
			color: 'default'
		},
		'1': {
			name: 'Halifax',
			lat:  44.6488625,
			lng:   -63.5753196,
			color: 'default'
		}
	}

} //end of simplemaps_canadamap_mapdata







