// Generated by https://quicktype.io

export interface PropertyDetailedRent {
	price?:               number;
	baths?:               number;
	property_id:          string;
	listing_id:           string;
	prop_type:            string;
	list_date:            string;
	last_update:          string;
	listing_status:       string;
	beds:                 number;
	description:          string;
	building:             Building;
	building_href:        string;
	branding:             Branding;
	prop_status:          string;
	matterports:          MatterportElement[];
	address:              Address;
	features:             Feature[];
	client_display_flags: ClientDisplayFlags;
	products:             string[];
	management:           Management;
	office:               Management;
	lead_forms:           LeadForms;
	lot_size:             LotSize;
	building_size?:       BuildingSize;
	rdc_web_url:          string;
	rdc_app_url:          string;
	mortgage:             Mortgage;
	community:            Community;
	floor_plans:          FloorPlan[];
	data_source_name:     string;
	source:               string;
	detail_tracking:      string;
	lease_terms:          string;
	photo_count:          number;
	photos:               Photo[];
	schools:              School[];
}

export interface Address {
	city:                   string;
	country:                string;
	county:                 string;
	county_needed_for_uniq: boolean;
	lat:                    number;
	line:                   string;
	postal_code:            string;
	state_code:             string;
	state:                  string;
	time_zone:              string;
	neighborhood_name:      string;
	neighborhoods:          Neighborhood[];
	lon:                    number;
}

export interface Neighborhood {
	id:    string;
	level: string;
	name:  string;
}

export interface Branding {
	state_license: null;
}

export interface Building {
	id:        number;
	permalink: string;
}

export interface BuildingSize {
	size?: any;
	units: string;
}

export interface ClientDisplayFlags {
	presentation_status:            string;
	is_showcase:                    boolean;
	lead_form_phone_required:       boolean;
	price_change:                   number;
	has_specials:                   boolean;
	is_mls_rental:                  boolean;
	is_rental_community:            boolean;
	is_rental_unit:                 boolean;
	is_co_star:                     boolean;
	is_apartmentlist:               boolean;
	suppress_map_pin:               boolean;
	suppress_phone_call_lead_event: boolean;
	price_reduced:                  boolean;
	allows_cats:                    boolean;
	allows_dogs:                    boolean;
	has_matterport:                 boolean;
}

export interface Community {
	baths_max:        number;
	baths_min:        number;
	beds_max:         number;
	beds_min:         number;
	contact_number:   string;
	floor_plan_count: number;
	id:               number;
	name:             string;
	matterport:       CommunityMatterport;
	price_max:        number;
	price_min:        number;
	source_id:        string;
	sqft_max:         number;
	sqft_min:         number;
	unit_count:       number;
}

export interface CommunityMatterport {
	image_url: null;
	video_key: null;
}

export interface Feature {
	category:        string;
	text:            string[];
	parent_category: string;
}

export interface FloorPlan {
	baths:         number;
	baths_half:    number;
	beds:          number;
	deposit_hint:  Hint;
	id:            number;
	name:          string;
	photo:         Photo;
	photo_count:   number;
	price_hint?:   Hint;
	sqft:          number;
	type:          null;
	availability?: Availability;
	price?:        number;
}

export interface Availability {
	available: null;
	date:      string;
	href:      null;
	text:      null;
	status:    null;
}

export enum Hint {
	Call = "CALL",
}

export interface Photo {
	href: string;
}

export interface LeadForms {
	form:            Form;
	show_agent:      boolean;
	show_broker:     boolean;
	show_provider:   boolean;
	show_management: boolean;
}

export interface Form {
	name:         Email;
	email:        Email;
	move_in_date: MoveInDate;
	phone:        FormPhone;
	message:      Email;
	show:         boolean;
}

export interface Email {
	required:                boolean;
	minimum_character_count: number;
}

export interface MoveInDate {
	required:                boolean;
	default_date:            string;
	minimum_days_from_today: number;
	maximum_days_from_today: number;
}

export interface FormPhone {
	required:                boolean;
	minimum_character_count: number;
	maximum_character_count: number;
}

export interface LotSize {
	size:  number;
	units: string;
}

export interface Management {
	email?:        string;
	id:            string;
	name:          string;
	type:          string;
	state_license: null;
	phones:        PhoneElement[];
	hours?:        Hour[];
}

export interface Hour {
	day:        string[];
	start_time: string;
	end_time:   string;
}

export interface PhoneElement {
	number:  string;
	type:    string;
	primary: boolean;
}

export interface MatterportElement {
	id:        null;
	url:       string;
	thumb_url: null;
}

export interface Mortgage {
	rates_url: string;
}

export interface School {
	nces_id:                string;
	id:                     string;
	greatschools_id:        string;
	name:                   string;
	education_levels:       EducationLevel[];
	funding_type:           string;
	lat:                    number;
	lon:                    number;
	student_count?:         number;
	student_teacher_ratio?: number;
	location:               Location;
	phone:                  string;
	distance_in_miles:      number;
	grades?:                Grades;
	relevance:              string;
	ratings:                Ratings;
}

export enum EducationLevel {
	Elementary = "elementary",
	High = "high",
	Middle = "middle",
}

export interface Grades {
	range: Range;
}

export interface Range {
	low:  string;
	high: string;
}

export interface Location {
	city_slug_id: string;
	postal_code:  string;
	state:        string;
	county:       string;
	city:         string;
	street:       string;
}

export interface Ratings {
	great_schools_rating: number | null;
	parent_rating:        number | null;
}
