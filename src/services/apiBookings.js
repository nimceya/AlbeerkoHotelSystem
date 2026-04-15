import { getToday } from "../utils/helpers";
import supabase from "./supabase";
// import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

// GET ALL BOOKINGS
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(full_name, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter)
    query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data: data || [], count }; // ✅ FIX
}

// GET SINGLE BOOKING
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(", cabins(), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data || {}; // ✅ SAFE
}

// BOOKINGS AFTER DATE
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data || []; // ✅ FIX
}

// STAYS AFTER DATE
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data || []; // ✅ FIX
}

// TODAY ACTIVITY
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data || []; // ✅ FIX (IMPORTANT)
}

// UPDATE BOOKING
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

// DELETE BOOKING
export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}