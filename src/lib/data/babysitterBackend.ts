import type { RealtimeChannel } from "@supabase/supabase-js";

import { assertSupabaseEnv, supabase } from "@/lib/supabase/client";
import type {
  Babysitter,
  BookingRequest,
  BookingRequestStatus,
  CreateBabysitterInput,
  CreateBookingRequestInput,
} from "@/lib/supabase/types";

const babysitterTable = "babysitters";
const bookingRequestsTable = "booking_requests";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown Supabase error";
}

function assertNoError(error: unknown, action: string) {
  if (error) {
    throw new Error(`${action}: ${toErrorMessage(error)}`);
  }
}

export async function listBabysitters(): Promise<Babysitter[]> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(babysitterTable)
    .select("*")
    .order("is_online", { ascending: false })
    .order("created_at", { ascending: false });

  assertNoError(error, "Failed to list babysitters");
  return data ?? [];
}

export async function createBabysitter(input: CreateBabysitterInput): Promise<Babysitter> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(babysitterTable)
    .insert({
      certified: false,
      is_online: true,
      ...input,
    })
    .select("*")
    .single();

  assertNoError(error, "Failed to create babysitter");
  if (!data) throw new Error("Failed to create babysitter: no row returned");

  return data;
}

export async function getBabysitterByCode(code: string): Promise<Babysitter | null> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(babysitterTable)
    .select("*")
    .eq("demo_code", code)
    .maybeSingle();

  assertNoError(error, "Failed to get babysitter by demo code");
  return data ?? null;
}

export async function listBookingRequestsForSitter(babysitterId: string): Promise<BookingRequest[]> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(bookingRequestsTable)
    .select("*")
    .eq("babysitter_id", babysitterId)
    .order("created_at", { ascending: false });

  assertNoError(error, "Failed to list booking requests");
  return data ?? [];
}

export async function createBookingRequest(input: CreateBookingRequestInput): Promise<BookingRequest> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(bookingRequestsTable)
    .insert({
      ...input,
      status: "pending",
    })
    .select("*")
    .single();

  assertNoError(error, "Failed to create booking request");
  if (!data) throw new Error("Failed to create booking request: no row returned");

  return data;
}

export async function updateBookingRequestStatus(
  id: string,
  status: BookingRequestStatus,
): Promise<BookingRequest> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from(bookingRequestsTable)
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  assertNoError(error, "Failed to update booking request status");
  if (!data) throw new Error("Failed to update booking request status: no row returned");

  return data;
}

export function subscribeToBookingRequestsForSitter(
  babysitterId: string,
  callback: (request: BookingRequest) => void,
): RealtimeChannel {
  assertSupabaseEnv();
  return supabase
    .channel(`booking-requests:${babysitterId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: bookingRequestsTable,
        filter: `babysitter_id=eq.${babysitterId}`,
      },
      (payload) => {
        callback(payload.new as BookingRequest);
      },
    )
    .subscribe();
}

export function subscribeToBabysitters(callback: (babysitter: Babysitter) => void): RealtimeChannel {
  assertSupabaseEnv();
  return supabase
    .channel("babysitters")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: babysitterTable,
      },
      (payload) => {
        callback(payload.new as Babysitter);
      },
    )
    .subscribe();
}
