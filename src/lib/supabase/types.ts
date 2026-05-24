export type BookingRequestStatus = "pending" | "accepted" | "declined" | "cancelled";

export type Babysitter = {
  id: string;
  demo_code: string;
  name: string;
  phone?: string | null;
  district: string;
  address_label: string;
  lat: number;
  lng: number;
  price_per_hour: number;
  available_time: string;
  age_range: string;
  experience_years: number;
  intro?: string | null;
  service_tags: string[];
  certified: boolean;
  is_online: boolean;
  created_at: string;
};

export type BookingRequest = {
  id: string;
  babysitter_id: string;
  parent_name: string;
  parent_phone?: string | null;
  service_type: string;
  child_age: string;
  location_label: string;
  requested_time: string;
  duration_hours: number;
  estimated_cost: number;
  notes?: string | null;
  status: BookingRequestStatus;
  created_at: string;
  updated_at: string;
};

export type CreateBabysitterInput = {
  demo_code: string;
  name: string;
  phone?: string;
  district: string;
  address_label: string;
  lat: number;
  lng: number;
  price_per_hour: number;
  available_time: string;
  age_range: string;
  experience_years: number;
  intro?: string;
  service_tags: string[];
  certified?: boolean;
  is_online?: boolean;
};

export type CreateBookingRequestInput = {
  babysitter_id: string;
  parent_name: string;
  parent_phone?: string;
  service_type: string;
  child_age: string;
  location_label: string;
  requested_time: string;
  duration_hours: number;
  estimated_cost: number;
  notes?: string;
};

export type Database = {
  public: {
    Tables: {
      babysitters: {
        Row: Babysitter;
        Insert: CreateBabysitterInput;
        Update: Partial<CreateBabysitterInput>;
        Relationships: [];
      };
      booking_requests: {
        Row: BookingRequest;
        Insert: CreateBookingRequestInput & {
          status?: BookingRequestStatus;
        };
        Update: Partial<CreateBookingRequestInput> & {
          status?: BookingRequestStatus;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "booking_requests_babysitter_id_fkey";
            columns: ["babysitter_id"];
            isOneToOne: false;
            referencedRelation: "babysitters";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      booking_request_status: BookingRequestStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
