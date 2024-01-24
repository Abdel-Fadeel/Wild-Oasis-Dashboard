export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type Option = {
  label: string;
  value: string;
};
export type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: BookingStatus;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
};
