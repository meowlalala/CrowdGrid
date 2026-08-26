"use client";

import { useMemo, useState, type ReactNode } from "react";

type Role = "customer" | "proxy" | "owner";

type EventStatus =
  | "DRAFT"
  | "UNDER_VERIFICATION"
  | "DOCUMENTS_REQUIRED"
  | "PUBLISHED"
  | "REJECTED";

type BookingStep = "details" | "payment" | "confirmation";

type EventRecord = {
  id: number;
  name: string;
  category: string;
  type: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  capacity: number;
  registered: number;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  status: EventStatus;
  documents: string[];
  ticketName: string;
  ticketPrice: number;
};

type Participant = {
  id: string;
  eventId: number;
  name: string;
  age: number;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  ticketType: string;
  amount: number;
  paymentStatus: "PAID";
  bookingStatus: "CONFIRMED";
  bookingId: string;
  checkedIn: boolean;
  createdAt: string;
};

/* ============================================================
   DATA
============================================================ */

const categories = [
  "Public Event",
  "Corporate",
  "Concert",
  "Sports Event",
  "Expo",
  "Conference",
];

const eventTypes = [
  "Concert",
  "Sports Event",
  "Expo",
  "Conference",
  "Webinar",
  "Cultural Festival",
  "Public Exhibition",
];

const initialEvents: EventRecord[] = [
  {
    id: 1,
    name: "Mumbai Football Championship 2026",
    category: "Public Event",
    type: "Sports Event",
    description:
      "A major inter-college football championship featuring teams from across Mumbai.",
    date: "15 September 2026",
    startTime: "10:00 AM",
    endTime: "07:00 PM",
    venue: "Mumbai Sports Complex",
    city: "Mumbai",
    capacity: 3000,
    registered: 2450,
    organizer: "Mumbai Sports Association",
    organizerEmail: "organizer@example.com",
    organizerPhone: "+91 98765 43210",
    status: "PUBLISHED",
    documents: [
      "Organizer Identity Proof",
      "Venue Permission",
      "Event Authorization",
    ],
    ticketName: "General Admission",
    ticketPrice: 500,
  },
  {
    id: 2,
    name: "Delhi Cultural Expo 2026",
    category: "Public Event",
    type: "Expo",
    description:
      "A public cultural exhibition featuring artists, crafts, food vendors and cultural performances.",
    date: "20 September 2026",
    startTime: "09:00 AM",
    endTime: "08:00 PM",
    venue: "Pragati Maidan",
    city: "Delhi",
    capacity: 5000,
    registered: 1280,
    organizer: "Delhi Cultural Foundation",
    organizerEmail: "culture@example.com",
    organizerPhone: "+91 98765 11111",
    status: "PUBLISHED",
    documents: [
      "Organizer Identity Proof",
      "Venue Permission",
    ],
    ticketName: "General Entry",
    ticketPrice: 300,
  },
  {
    id: 3,
    name: "National Technology Summit",
    category: "Corporate",
    type: "Conference",
    description:
      "Technology leadership summit featuring speakers, workshops and networking sessions.",
    date: "05 October 2026",
    startTime: "09:30 AM",
    endTime: "06:30 PM",
    venue: "Bengaluru Convention Centre",
    city: "Bengaluru",
    capacity: 1500,
    registered: 640,
    organizer: "Tech India Pvt Ltd",
    organizerEmail: "tech@example.com",
    organizerPhone: "+91 98765 22222",
    status: "PUBLISHED",
    documents: [
      "Company Registration",
      "Venue Permission",
    ],
    ticketName: "Conference Pass",
    ticketPrice: 1200,
  },
  {
    id: 4,
    name: "Pune Music Festival",
    category: "Public Event",
    type: "Concert",
    description:
      "Large public music festival featuring multiple artists, food stalls and entertainment zones.",
    date: "12 October 2026",
    startTime: "04:00 PM",
    endTime: "10:00 PM",
    venue: "Mahalaxmi Lawns",
    city: "Pune",
    capacity: 7000,
    registered: 3120,
    organizer: "Pune Live Events",
    organizerEmail: "pune@example.com",
    organizerPhone: "+91 98765 33333",
    status: "PUBLISHED",
    documents: [
      "Organizer Identity Proof",
      "Venue Permission",
    ],
    ticketName: "Festival Pass",
    ticketPrice: 800,
  },
  {
    id: 5,
    name: "Mumbai Business Leaders Forum",
    category: "Corporate",
    type: "Conference",
    description:
      "A focused business networking forum for founders, executives and industry leaders.",
    date: "22 October 2026",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    venue: "Jio World Convention Centre",
    city: "Mumbai",
    capacity: 1000,
    registered: 410,
    organizer: "CrowdGrid Corporate",
    organizerEmail: "corporate@example.com",
    organizerPhone: "+91 98765 44444",
    status: "PUBLISHED",
    documents: [
      "Company Registration",
    ],
    ticketName: "Business Pass",
    ticketPrice: 1500,
  },
];

const initialParticipants: Participant[] = [];

/* ============================================================
   ICON SYSTEM
============================================================ */

function Icon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    back: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),

    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),

    verified: (
      <>
        <path d="M12 3l2.2 2 3-.2.9 2.9 2.5 1.7-1.2 2.8.5 3-2.8 1.1-1.1 2.8-3-.5-2.8 1.2-1.7-2.5-2.9-.9.2-3L3 12l2-2.2-.2-3 2.9-.9L9.4 3.4l2.6.9Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),

    add: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    admin: (
      <>
        <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),

    credit: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),

    bank: (
      <>
        <path d="m3 10 9-6 9 6" />
        <path d="M5 10v7M9 10v7M15 10v7M19 10v7" />
        <path d="M3 20h18" />
      </>
    ),

    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),

    warning: (
      <>
        <path d="M12 3 22 20H2L12 3Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),

    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.1.8-1.7 1.2-1.7 2.7" />
        <path d="M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.verified}
    </svg>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function Badge({
  status,
}: {
  status: EventStatus;
}) {
  return (
    <span className={`badge ${status.toLowerCase()}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function InfoBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="info-box">
      <div className="info-label">
        {icon && <Icon name={icon} size={13} />}
        {label}
      </div>
      <div className="info-value">{value}</div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon name={icon} />
      </div>

      <div className="muted stat-label">{label}</div>

      <div className="stat-value">
        {value.toLocaleString("en-IN")}
      </div>
    </div>
  );
}

function Modal({
  children,
  close,
  wide = false,
}: {
  children: ReactNode;
  close: () => void;
  wide?: boolean;
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div className={`modal ${wide ? "wide" : ""}`}>
        {children}
      </div>
    </div>
  );
}

function Summary({
  event,
}: {
  event: EventRecord;
}) {
  return (
    <aside className="summary">
      <span>ORDER SUMMARY</span>

      <h3>{event.name}</h3>

      <div>
        <small>{event.ticketName}</small>
        <strong>
          ₹{event.ticketPrice.toLocaleString("en-IN")}
        </strong>
      </div>

      <hr />

      <div>
        <strong>Total</strong>
        <strong>
          ₹{event.ticketPrice.toLocaleString("en-IN")}
        </strong>
      </div>
    </aside>
  );
}

function FakeQR({
  value,
}: {
  value: string;
}) {
  const blocks = Array.from(
    { length: 64 },
    (_, index) =>
      ((index * 17 + value.length * 13) % 7) < 3
  );

  return (
    <div className="fake-qr">
      {blocks.map((active, index) => (
        <i
          key={index}
          className={active ? "on" : ""}
        />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function GatheringPage() {
  const [role, setRole] =
    useState<Role>("customer");

  const [events, setEvents] =
    useState<EventRecord[]>(initialEvents);

  const [participants, setParticipants] =
    useState<Participant[]>(initialParticipants);

  /* CUSTOMER */

  const [search, setSearch] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [category, setCategory] =
    useState("All");

  const [city, setCity] =
    useState("All");

  const [price, setPrice] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("date");

  const [selectedCustomerEvent, setSelectedCustomerEvent] =
    useState<number | null>(null);

  /* BOOKING */

  const [bookingEventId, setBookingEventId] =
    useState<number | null>(null);

  const [bookingStep, setBookingStep] =
    useState<BookingStep>("details");

  const [booking, setBooking] =
    useState<Participant | null>(null);

  const [participantName, setParticipantName] =
    useState("");

  const [participantAge, setParticipantAge] =
    useState("");

  const [participantEmail, setParticipantEmail] =
    useState("");

  const [participantMobile, setParticipantMobile] =
    useState("");

  const [participantAddress, setParticipantAddress] =
    useState("");

  const [participantCity, setParticipantCity] =
    useState("");

  const [participantState, setParticipantState] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [upiId, setUpiId] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [cardName, setCardName] =
    useState("");

  const [cardExpiry, setCardExpiry] =
    useState("");

  const [cardCvv, setCardCvv] =
    useState("");

  /* PROXY */

  const [proxyRegistered, setProxyRegistered] =
    useState(true);

  const [proxyName, setProxyName] =
    useState("Shubham Surve");

  const [proxyEmail, setProxyEmail] =
    useState("organizer@example.com");

  const [proxyOrganization, setProxyOrganization] =
    useState("Mumbai Sports Association");

  const [proxyPhone, setProxyPhone] =
    useState("+91 98765 43210");

  const [showProxyRegister, setShowProxyRegister] =
    useState(false);

  const [showCreateEvent, setShowCreateEvent] =
    useState(false);

  const [participantSearch, setParticipantSearch] =
    useState("");

  const [selectedEvent, setSelectedEvent] =
    useState<number | null>(null);

  const [documents, setDocuments] =
    useState<string[]>([]);

  const [documentName, setDocumentName] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* EVENT CREATION */

  const [eventName, setEventName] =
    useState("");

  const [eventCategory, setEventCategory] =
    useState("Public Event");

  const [eventType, setEventType] =
    useState("Conference");

  const [eventDescription, setEventDescription] =
    useState("");

  const [eventDate, setEventDate] =
    useState("");

  const [eventStartTime, setEventStartTime] =
    useState("");

  const [eventEndTime, setEventEndTime] =
    useState("");

  const [eventVenue, setEventVenue] =
    useState("");

  const [eventCity, setEventCity] =
    useState("");

  const [eventCapacity, setEventCapacity] =
    useState("");

  const [ticketName, setTicketName] =
    useState("General Admission");

  const [ticketPrice, setTicketPrice] =
    useState("");

  /* OWNER */

  const [ownerSearch, setOwnerSearch] =
    useState("");

  /* ============================================================
     DERIVED DATA
  ============================================================ */

  const cities = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(events.map((event) => event.city))
      ),
    ];
  }, [events]);

  const publicEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      if (event.status !== "PUBLISHED") {
        return false;
      }

      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        `${event.name} ${event.type} ${event.category} ${event.city} ${event.venue}`
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        event.category === category ||
        event.type === category;

      const matchesCity =
        city === "All" ||
        event.city === city;

      const matchesPrice =
        price === "All" ||
        (price === "low" &&
          event.ticketPrice < 500) ||
        (price === "mid" &&
          event.ticketPrice >= 500 &&
          event.ticketPrice <= 1000) ||
        (price === "high" &&
          event.ticketPrice > 1000);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesPrice
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price") {
        return a.ticketPrice - b.ticketPrice;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return (
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
      );
    });
  }, [
    events,
    search,
    category,
    city,
    price,
    sortBy,
  ]);

  const proxyEvents = useMemo(() => {
    if (!proxyRegistered) {
      return [];
    }

    return events.filter(
      (event) =>
        event.organizerEmail === proxyEmail
    );
  }, [
    events,
    proxyEmail,
    proxyRegistered,
  ]);

  const proxyParticipants = useMemo(() => {
    const eventIds = new Set(
      proxyEvents.map((event) => event.id)
    );

    const query =
      participantSearch.toLowerCase();

    return participants.filter((participant) => {
      const belongsToProxy =
        eventIds.has(participant.eventId);

      const matches =
        !query ||
        `${participant.name} ${participant.email}`
          .toLowerCase()
          .includes(query);

      return belongsToProxy && matches;
    });
  }, [
    participants,
    proxyEvents,
    participantSearch,
  ]);

  const ownerEvents = useMemo(() => {
    const query =
      ownerSearch.toLowerCase();

    return events.filter((event) => {
      return (
        !query ||
        `${event.name} ${event.organizer} ${event.status} ${event.city}`
          .toLowerCase()
          .includes(query)
      );
    });
  }, [events, ownerSearch]);

  const currentCustomerEvent =
    selectedCustomerEvent
      ? events.find(
          (event) =>
            event.id === selectedCustomerEvent
        )
      : null;

  const currentBookingEvent =
    bookingEventId
      ? events.find(
          (event) =>
            event.id === bookingEventId
        )
      : null;

  /* ============================================================
     HELPERS
  ============================================================ */

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function resetFilters() {
    setCategory("All");
    setCity("All");
    setPrice("All");
    setSortBy("date");
  }

  /* ============================================================
     BOOKING
  ============================================================ */

  function openBooking(id: number) {
    setSelectedCustomerEvent(null);
    setBookingEventId(id);
    setBookingStep("details");
    setBooking(null);

    setParticipantName("");
    setParticipantAge("");
    setParticipantEmail("");
    setParticipantMobile("");
    setParticipantAddress("");
    setParticipantCity("");
    setParticipantState("");

    setPaymentMethod("UPI");
    setUpiId("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
  }

  function closeBooking() {
    setBookingEventId(null);
    setBookingStep("details");
    setBooking(null);
  }

  function continueToPayment() {
    if (
      !participantName.trim() ||
      !participantAge ||
      !participantEmail.trim() ||
      !participantMobile.trim() ||
      !participantAddress.trim() ||
      !participantCity.trim() ||
      !participantState.trim()
    ) {
      alert(
        "Please complete all participant details."
      );
      return;
    }

    const age = Number(participantAge);

    if (age < 1 || age > 120) {
      alert("Please enter a valid age.");
      return;
    }

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        participantEmail
      );

    if (!emailValid) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    setBookingStep("payment");
  }

  function processPayment() {
    if (!currentBookingEvent) {
      return;
    }

    if (
      paymentMethod === "UPI" &&
      !upiId.trim()
    ) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (
      paymentMethod === "Card" &&
      (!cardNumber.trim() ||
        !cardName.trim() ||
        !cardExpiry.trim() ||
        !cardCvv.trim())
    ) {
      alert(
        "Please complete all card details."
      );
      return;
    }

    if (
      currentBookingEvent.registered >=
      currentBookingEvent.capacity
    ) {
      alert("This event is full.");
      return;
    }

    const bookingId =
      `CG-${currentBookingEvent.id}-${Date.now()}`
        .toUpperCase();

    const newParticipant: Participant = {
      id: `P-${Date.now()}`,
      eventId: currentBookingEvent.id,
      name: participantName,
      age: Number(participantAge),
      email: participantEmail,
      mobile: participantMobile,
      address: participantAddress,
      city: participantCity,
      state: participantState,
      ticketType:
        currentBookingEvent.ticketName,
      amount:
        currentBookingEvent.ticketPrice,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
      bookingId,
      checkedIn: false,
      createdAt:
        new Date().toLocaleDateString(
          "en-IN"
        ),
    };

    setParticipants((current) => [
      ...current,
      newParticipant,
    ]);

    setEvents((current) =>
      current.map((event) =>
        event.id === currentBookingEvent.id
          ? {
              ...event,
              registered:
                event.registered + 1,
            }
          : event
      )
    );

    setBooking(newParticipant);
    setBookingStep("confirmation");
  }

  /* ============================================================
     PROXY
  ============================================================ */

  function createProxyAccount() {
    if (
      !proxyName.trim() ||
      !proxyEmail.trim() ||
      !proxyOrganization.trim() ||
      !proxyPhone.trim()
    ) {
      alert(
        "Please complete all organizer details."
      );
      return;
    }

    setProxyRegistered(true);
    setShowProxyRegister(false);

    showMessage(
      "Organizer account created successfully."
    );
  }

  function createEvent() {
    if (
      !eventName.trim() ||
      !eventDate ||
      !eventVenue.trim() ||
      !eventCity.trim() ||
      !eventCapacity ||
      !ticketPrice
    ) {
      alert(
        "Please complete all required event details."
      );
      return;
    }

    const capacity = Number(eventCapacity);
    const price = Number(ticketPrice);

    if (capacity <= 0 || price < 0) {
      alert(
        "Please enter valid capacity and ticket price."
      );
      return;
    }

    const newEvent: EventRecord = {
      id: Date.now(),
      name: eventName,
      category: eventCategory,
      type: eventType,
      description:
        eventDescription ||
        "Event hosted on CrowdGrid.",
      date: eventDate,
      startTime:
        eventStartTime || "10:00 AM",
      endTime:
        eventEndTime || "06:00 PM",
      venue: eventVenue,
      city: eventCity,
      capacity,
      registered: 0,
      organizer: proxyOrganization,
      organizerEmail: proxyEmail,
      organizerPhone: proxyPhone,
      status: "DRAFT",
      documents: [],
      ticketName,
      ticketPrice: price,
    };

    setEvents((current) => [
      ...current,
      newEvent,
    ]);

    setShowCreateEvent(false);

    setEventName("");
    setEventDescription("");
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
    setEventVenue("");
    setEventCity("");
    setEventCapacity("");
    setTicketName("General Admission");
    setTicketPrice("");

    showMessage(
      "Event created. Add verification documents before submitting."
    );
  }

  function openVerification(
    event: EventRecord
  ) {
    setSelectedEvent(event.id);
    setDocuments(event.documents);
    setDocumentName("");
  }

  function addDocument() {
    const value = documentName.trim();

    if (!value) {
      return;
    }

    setDocuments((current) => [
      ...current,
      value,
    ]);

    setDocumentName("");
  }

  function removeDocument(index: number) {
    setDocuments((current) =>
      current.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  }

  function submitVerification(id: number) {
    if (documents.length < 2) {
      alert(
        "Please add at least two verification documents."
      );
      return;
    }

    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              documents,
              status:
                "UNDER_VERIFICATION",
            }
          : event
      )
    );

    setSelectedEvent(null);

    showMessage(
      "Event submitted for Owner verification."
    );
  }

  /* ============================================================
     OWNER
  ============================================================ */

  function updateEventStatus(
    id: number,
    status: EventStatus
  ) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              status,
            }
          : event
      )
    );

    setSelectedEvent(null);

    const message =
      status === "PUBLISHED"
        ? "Event approved and published."
        : status === "DOCUMENTS_REQUIRED"
          ? "Additional documents requested."
          : "Event rejected.";

    showMessage(message);
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="app">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header>
        <button
          className="brand"
          onClick={() => setRole("customer")}
        >
          <span className="brand-mark">
            <Icon
              name="verified"
              size={20}
            />
          </span>

          <span>
            <b>CROWDGRID</b>
            <small>EVENT MANAGEMENT</small>
          </span>
        </button>

        <nav>
          {(
            [
              ["customer", "Customer"],
              ["proxy", "Proxy Admin"],
              ["owner", "Owner"],
            ] as [Role, string][]
          ).map(([itemRole, label]) => (
            <button
              key={itemRole}
              onClick={() =>
                setRole(itemRole)
              }
              className={
                role === itemRole
                  ? `nav-active ${itemRole}`
                  : ""
              }
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="head-right">
          <span className="help">
            <Icon name="help" size={17} />
            Help
          </span>

          <span className="avatar">
            <Icon name="person" size={18} />
          </span>
        </div>
      </header>

      {/* ======================================================
          CUSTOMER
      ====================================================== */}

      {role === "customer" && (
        <main>
          <section className="hero">
            <div>
              <span className="eyebrow dark">
                <i />
                VERIFIED EVENTS
              </span>

              <h1>
                Find your next{" "}
                <em>experience.</em>
              </h1>

              <p>
                Discover verified public events,
                conferences, concerts and
                experiences. Register securely
                and receive your digital event
                pass.
              </p>

              <div className="searchbar">
                <Icon
                  name="search"
                  size={20}
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search events, city or event type"
                />

                <button
                  onClick={() =>
                    document
                      .getElementById("events")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Search events
                </button>
              </div>
            </div>
          </section>

          <section
            id="events"
            className="content"
          >
            <div className="section-head">
              <div>
                <span className="eyebrow">
                  DISCOVER
                </span>

                <h2>
                  Upcoming events
                </h2>

                <p>
                  Only approved and published
                  events appear here.
                </p>
              </div>

              {/* SINGLE FILTER BUTTON */}

              <div className="filter-wrap">
                <button
                  className={`filter-btn ${
                    showFilters
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setShowFilters(
                      !showFilters
                    )
                  }
                >
                  <Icon
                    name="filter"
                    size={18}
                  />

                  Filter events

                  {(category !== "All" ||
                    city !== "All" ||
                    price !== "All") && (
                    <span className="filter-dot">
                      •
                    </span>
                  )}
                </button>

                {showFilters && (
                  <div className="filter-panel">
                    <div className="filter-title">
                      <div>
                        <b>
                          Filter events
                        </b>

                        <small>
                          Choose how you want
                          to browse.
                        </small>
                      </div>

                      <button
                        onClick={
                          resetFilters
                        }
                      >
                        Clear all
                      </button>
                    </div>

                    <Field label="Category">
                      <select
                        className="field"
                        value={category}
                        onChange={(event) =>
                          setCategory(
                            event.target
                              .value
                          )
                        }
                      >
                        <option value="All">
                          All categories
                        </option>

                        {categories.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </Field>

                    <Field label="City">
                      <select
                        className="field"
                        value={city}
                        onChange={(event) =>
                          setCity(
                            event.target
                              .value
                          )
                        }
                      >
                        {cities.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </Field>

                    <Field label="Price">
                      <select
                        className="field"
                        value={price}
                        onChange={(event) =>
                          setPrice(
                            event.target
                              .value
                          )
                        }
                      >
                        <option value="All">
                          Any price
                        </option>

                        <option value="low">
                          Under ₹500
                        </option>

                        <option value="mid">
                          ₹500 – ₹1,000
                        </option>

                        <option value="high">
                          Above ₹1,000
                        </option>
                      </select>
                    </Field>

                    <Field label="Sort by">
                      <select
                        className="field"
                        value={sortBy}
                        onChange={(event) =>
                          setSortBy(
                            event.target
                              .value
                          )
                        }
                      >
                        <option value="date">
                          Date: soonest first
                        </option>

                        <option value="price">
                          Price: low to high
                        </option>

                        <option value="name">
                          Name: A to Z
                        </option>
                      </select>
                    </Field>

                    <button
                      className="apply"
                      onClick={() =>
                        setShowFilters(false)
                      }
                    >
                      Apply filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="result-row">
              <span>
                {publicEvents.length}{" "}
                {publicEvents.length === 1
                  ? "event"
                  : "events"}{" "}
                found
              </span>

              {(category !== "All" ||
                city !== "All" ||
                price !== "All" ||
                sortBy !== "date") && (
                <button
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              )}
            </div>

            {publicEvents.length === 0 ? (
              <div className="empty">
                <Icon
                  name="search"
                  size={30}
                />

                <h3>
                  No events found
                </h3>

                <p>
                  Try changing your search
                  or filters.
                </p>
              </div>
            ) : (
              <div className="cards">
                {publicEvents.map(
                  (event) => (
                    <article
                      className="card"
                      key={event.id}
                    >
                      <div className="card-art">
                        <span>
                          {event.type}
                        </span>

                        <div>
                          <small>
                            {event.city}
                          </small>

                          <b>
                            {event.date}
                          </b>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="title-row">
                          <h3>
                            {event.name}
                          </h3>

                          <Icon
                            name="verified"
                            size={21}
                          />
                        </div>

                        <p className="desc">
                          {
                            event.description
                          }
                        </p>

                        <div className="info-grid">
                          <InfoBox
                            label="Venue"
                            value={
                              event.venue
                            }
                          />

                          <InfoBox
                            label="Registered"
                            value={event.registered.toLocaleString(
                              "en-IN"
                            )}
                          />
                        </div>

                        <div className="card-bottom">
                          <div>
                            <small>
                              Starting from
                            </small>

                            <strong>
                              ₹
                              {event.ticketPrice.toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>

                          <button
                            onClick={() =>
                              setSelectedCustomerEvent(
                                event.id
                              )
                            }
                          >
                            View event
                            <Icon
                              name="arrow"
                              size={16}
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </section>
        </main>
      )}

      {/* ======================================================
          PROXY ADMIN
      ====================================================== */}

      {role === "proxy" && (
        <main className="content admin">
          {!proxyRegistered ? (
            <div className="register-card">
              <div className="register-left">
                <span className="eyebrow orange">
                  EVENT ORGANIZER PORTAL
                </span>

                <h2>
                  Create and manage
                  your own events.
                </h2>

                <p>
                  Register as a Proxy Admin,
                  submit your event and
                  supporting documents, and
                  get verified before it
                  reaches customers.
                </p>

                <div className="steps-list">
                  <div>
                    <b>01</b>
                    Create organizer profile
                  </div>

                  <div>
                    <b>02</b>
                    Create your event
                  </div>

                  <div>
                    <b>03</b>
                    Upload verification documents
                  </div>

                  <div>
                    <b>04</b>
                    Get approved and publish
                  </div>
                </div>
              </div>

              <div className="register-right">
                {!showProxyRegister ? (
                  <>
                    <div className="big-icon">
                      <Icon
                        name="admin"
                        size={28}
                      />
                    </div>

                    <h3>
                      Proxy Admin registration
                    </h3>

                    <p>
                      Start by creating your
                      organizer account. You
                      can then create and submit
                      events for verification.
                    </p>

                    <button
                      className="primary orange full"
                      onClick={() =>
                        setShowProxyRegister(
                          true
                        )
                      }
                    >
                      Register as Proxy Admin
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="link-btn"
                      onClick={() =>
                        setShowProxyRegister(
                          false
                        )
                      }
                    >
                      <Icon
                        name="back"
                        size={16}
                      />
                      Back
                    </button>

                    <h3>
                      Create organizer account
                    </h3>

                    <div className="form-stack">
                      <Field label="Full name *">
                        <input
                          className="field"
                          value={proxyName}
                          onChange={(event) =>
                            setProxyName(
                              event.target
                                .value
                            )
                          }
                        />
                      </Field>

                      <Field label="Organization / company *">
                        <input
                          className="field"
                          value={
                            proxyOrganization
                          }
                          onChange={(event) =>
                            setProxyOrganization(
                              event.target
                                .value
                            )
                          }
                        />
                      </Field>

                      <Field label="Email address *">
                        <input
                          type="email"
                          className="field"
                          value={proxyEmail}
                          onChange={(event) =>
                            setProxyEmail(
                              event.target
                                .value
                            )
                          }
                        />
                      </Field>

                      <Field label="Mobile number *">
                        <input
                          className="field"
                          value={proxyPhone}
                          onChange={(event) =>
                            setProxyPhone(
                              event.target
                                .value
                            )
                          }
                        />
                      </Field>

                      <button
                        className="primary orange full"
                        onClick={
                          createProxyAccount
                        }
                      >
                        Create organizer account
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="admin-head">
                <div>
                  <span className="eyebrow orange">
                    PROXY ADMIN
                  </span>

                  <h2>
                    Good afternoon,{" "}
                    {
                      proxyName.split(
                        " "
                      )[0]
                    }
                  </h2>

                  <p>
                    Manage your events,
                    participants and
                    verification status.
                  </p>
                </div>

                <button
                  className="primary orange"
                  onClick={() =>
                    setShowCreateEvent(
                      true
                    )
                  }
                >
                  <Icon name="add" />
                  Create new event
                </button>
              </div>

              {message && (
                <div className="notice">
                  <Icon
                    name="check"
                    size={16}
                  />
                  {message}
                </div>
              )}

              <div className="stats">
                <StatCard
                  icon="calendar"
                  label="My events"
                  value={proxyEvents.length}
                />

                <StatCard
                  icon="verified"
                  label="Published"
                  value={
                    proxyEvents.filter(
                      (event) =>
                        event.status ===
                        "PUBLISHED"
                    ).length
                  }
                />

                <StatCard
                  icon="calendar"
                  label="Under review"
                  value={
                    proxyEvents.filter(
                      (event) =>
                        event.status ===
                          "UNDER_VERIFICATION" ||
                        event.status ===
                          "DOCUMENTS_REQUIRED"
                    ).length
                  }
                />

                <StatCard
                  icon="users"
                  label="Participants"
                  value={
                    proxyParticipants.length
                  }
                />
              </div>

              <div className="admin-grid">
                <section className="panel">
                  <div className="panel-head">
                    <div>
                      <h3>
                        My events
                      </h3>

                      <p>
                        Events created under
                        your organizer account.
                      </p>
                    </div>
                  </div>

                  {proxyEvents.length ===
                  0 ? (
                    <div className="empty small">
                      No events created yet.
                    </div>
                  ) : (
                    proxyEvents.map(
                      (event) => (
                        <div
                          className="event-row"
                          key={event.id}
                        >
                          <div>
                            <div className="row-title">
                              <b>
                                {
                                  event.name
                                }
                              </b>

                              <Badge
                                status={
                                  event.status
                                }
                              />
                            </div>

                            <p>
                              <Icon
                                name="calendar"
                                size={14}
                              />

                              {event.date}

                              <Icon
                                name="pin"
                                size={14}
                              />

                              {event.city}

                              <Icon
                                name="users"
                                size={14}
                              />

                              {
                                event.registered
                              }{" "}
                              registered
                            </p>
                          </div>

                          <button
                            className="secondary"
                            onClick={() =>
                              openVerification(
                                event
                              )
                            }
                          >
                            {event.status ===
                            "PUBLISHED"
                              ? "Manage"
                              : "Verification"}
                          </button>
                        </div>
                      )
                    )
                  )}
                </section>

                <section className="dark-panel">
                  <span className="eyebrow orange">
                    PARTICIPANT OVERVIEW
                  </span>

                  <h3>
                    Registrations
                  </h3>

                  <p>
                    Customer registration
                    details belonging to
                    your events.
                  </p>

                  <strong>
                    {
                      proxyParticipants.length
                    }
                  </strong>

                  <small>
                    total participant
                    records
                  </small>

                  <button
                    onClick={() =>
                      document
                        .getElementById(
                          "participants"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                        })
                    }
                  >
                    View participants
                  </button>
                </section>
              </div>

              <section
                id="participants"
                className="panel table-panel"
              >
                <div className="panel-head">
                  <div>
                    <h3>
                      Participants &
                      registrations
                    </h3>

                    <p>
                      Customer details
                      for your events.
                    </p>
                  </div>

                  <div className="table-search">
                    <Icon name="search" />

                    <input
                      value={
                        participantSearch
                      }
                      onChange={(event) =>
                        setParticipantSearch(
                          event.target
                            .value
                        )
                      }
                      placeholder="Search participant..."
                    />
                  </div>
                </div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Participant
                        </th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Ticket</th>
                        <th>Payment</th>
                        <th>Check-in</th>
                      </tr>
                    </thead>

                    <tbody>
                      {proxyParticipants.map(
                        (participant) => (
                          <tr
                            key={
                              participant.id
                            }
                          >
                            <td>
                              <b>
                                {
                                  participant.name
                                }
                              </b>

                              <small>
                                {
                                  participant.bookingId
                                }
                              </small>
                            </td>

                            <td>
                              {
                                participant.age
                              }
                            </td>

                            <td>
                              {
                                participant.email
                              }

                              <small>
                                {
                                  participant.mobile
                                }
                              </small>
                            </td>

                            <td>
                              {
                                participant.city
                              }

                              <small>
                                {
                                  participant.state
                                }
                              </small>
                            </td>

                            <td>
                              {
                                participant.ticketType
                              }
                            </td>

                            <td>
                              <span className="paid">
                                PAID
                              </span>
                            </td>

                            <td>
                              <span className="pending">
                                {participant.checkedIn
                                  ? "Checked in"
                                  : "Not checked in"}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>

                  {proxyParticipants.length ===
                    0 && (
                    <div className="empty small">
                      No participants found.
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      )}

      {/* ======================================================
          OWNER
      ====================================================== */}

      {role === "owner" && (
        <main className="content admin">
          <div className="admin-head">
            <div>
              <span className="eyebrow purple">
                PLATFORM ADMINISTRATION
              </span>

              <h2>
                Owner dashboard
              </h2>

              <p>
                Review events, organizers
                and platform-wide
                participant activity.
              </p>
            </div>

            <span className="access">
              <Icon name="admin" />
              Full platform access
            </span>
          </div>

          <div className="stats five">
            <StatCard
              icon="calendar"
              label="Total events"
              value={events.length}
            />

            <StatCard
              icon="verified"
              label="Published"
              value={
                events.filter(
                  (event) =>
                    event.status ===
                    "PUBLISHED"
                ).length
              }
            />

            <StatCard
              icon="calendar"
              label="Pending review"
              value={
                events.filter(
                  (event) =>
                    event.status ===
                    "UNDER_VERIFICATION"
                ).length
              }
            />

            <StatCard
              icon="users"
              label="Participants"
              value={participants.length}
            />

            <StatCard
              icon="credit"
              label="Paid bookings"
              value={
                participants.filter(
                  (participant) =>
                    participant.paymentStatus ===
                    "PAID"
                ).length
              }
            />
          </div>

          <section className="panel">
            <div className="panel-head">
              <div>
                <h3>
                  Event verification
                </h3>

                <p>
                  Review submitted events
                  before publication.
                </p>
              </div>

              <div className="table-search">
                <Icon name="search" />

                <input
                  value={ownerSearch}
                  onChange={(event) =>
                    setOwnerSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search events or organizers..."
                />
              </div>
            </div>

            {ownerEvents.map(
              (event) => (
                <div
                  className="event-row"
                  key={event.id}
                >
                  <div>
                    <div className="row-title">
                      <b>
                        {event.name}
                      </b>

                      <Badge
                        status={
                          event.status
                        }
                      />
                    </div>

                    <p>
                      {event.organizer}
                      {" · "}
                      {event.city}
                      {" · "}
                      {event.date}
                    </p>
                  </div>

                  <div className="row-actions">
                    {event.status ===
                      "UNDER_VERIFICATION" && (
                      <button
                        className="approve"
                        onClick={() =>
                          updateEventStatus(
                            event.id,
                            "PUBLISHED"
                          )
                        }
                      >
                        Approve
                      </button>
                    )}

                    <button
                      className="secondary"
                      onClick={() => {
                        setSelectedEvent(
                          event.id
                        );
                        setDocuments(
                          event.documents
                        );
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>
              )
            )}
          </section>

          <section className="panel table-panel">
            <div className="panel-head">
              <div>
                <h3>
                  All participants
                </h3>

                <p>
                  Platform-wide registration
                  records.
                </p>
              </div>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>
                      Participant
                    </th>
                    <th>Event</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map(
                    (participant) => {
                      const event =
                        events.find(
                          (item) =>
                            item.id ===
                            participant.eventId
                        );

                      return (
                        <tr
                          key={
                            participant.id
                          }
                        >
                          <td>
                            <b>
                              {
                                participant.name
                              }
                            </b>

                            <small>
                              {
                                participant.bookingId
                              }
                            </small>
                          </td>

                          <td>
                            {event?.name}
                          </td>

                          <td>
                            {
                              participant.age
                            }
                          </td>

                          <td>
                            {
                              participant.email
                            }

                            <small>
                              {
                                participant.mobile
                              }
                            </small>
                          </td>

                          <td>
                            {
                              participant.city
                            }
                            ,{" "}
                            {
                              participant.state
                            }
                          </td>

                          <td>
                            <span className="paid">
                              PAID
                            </span>
                          </td>

                          <td>
                            {
                              participant.bookingStatus
                            }
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>

              {participants.length ===
                0 && (
                <div className="empty small">
                  No participants yet.
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* ======================================================
          CUSTOMER EVENT DETAIL MODAL
      ====================================================== */}

      {currentCustomerEvent && (
        <Modal
          close={() =>
            setSelectedCustomerEvent(
              null
            )
          }
          wide
        >
          <div className="modal-art">
            <button
              className="icon-btn"
              onClick={() =>
                setSelectedCustomerEvent(
                  null
                )
              }
            >
              <Icon name="close" />
            </button>

            <div>
              <span>
                {currentCustomerEvent.type}
              </span>

              <h2>
                {currentCustomerEvent.name}
              </h2>
            </div>
          </div>

          <div className="modal-body">
            <div className="three">
              <InfoBox
                icon="calendar"
                label="Date"
                value={
                  currentCustomerEvent.date
                }
              />

              <InfoBox
                icon="pin"
                label="Venue"
                value={`${currentCustomerEvent.venue}, ${currentCustomerEvent.city}`}
              />

              <InfoBox
                icon="users"
                label="Availability"
                value={`${Math.max(
                  0,
                  currentCustomerEvent.capacity -
                    currentCustomerEvent.registered
                )} seats left`}
              />
            </div>

            <div className="detail-layout">
              <div>
                <h3>
                  About this event
                </h3>

                <p className="long-text">
                  {
                    currentCustomerEvent.description
                  }
                </p>

                <div className="detail-grid">
                  <InfoBox
                    label="Organizer"
                    value={
                      currentCustomerEvent.organizer
                    }
                  />

                  <InfoBox
                    label="Timing"
                    value={`${currentCustomerEvent.startTime} – ${currentCustomerEvent.endTime}`}
                  />

                  <InfoBox
                    label="Ticket"
                    value={
                      currentCustomerEvent.ticketName
                    }
                  />

                  <InfoBox
                    label="Category"
                    value={
                      currentCustomerEvent.category
                    }
                  />
                </div>
              </div>

              <aside className="price-box">
                <small>
                  STARTING FROM
                </small>

                <strong>
                  ₹
                  {currentCustomerEvent.ticketPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <p>
                  Digital pass included
                </p>

                <button
                  className="primary orange full"
                  disabled={
                    currentCustomerEvent.registered >=
                    currentCustomerEvent.capacity
                  }
                  onClick={() =>
                    openBooking(
                      currentCustomerEvent.id
                    )
                  }
                >
                  {currentCustomerEvent.registered >=
                  currentCustomerEvent.capacity
                    ? "Event is full"
                    : "Register now"}

                  {currentCustomerEvent.registered <
                    currentCustomerEvent.capacity && (
                    <Icon name="arrow" />
                  )}
                </button>
              </aside>
            </div>
          </div>
        </Modal>
      )}

      {/* ======================================================
          BOOKING MODAL
      ====================================================== */}

      {currentBookingEvent && (
        <Modal
          close={closeBooking}
          wide
        >
          <div className="booking-head">
            <div>
              <span>
                REGISTRATION
              </span>

              <h2>
                {currentBookingEvent.name}
              </h2>
            </div>

            <button
              className="icon-btn"
              onClick={closeBooking}
            >
              <Icon name="close" />
            </button>

            <div className="steps">
              {(
                [
                  "details",
                  "payment",
                  "confirmation",
                ] as BookingStep[]
              ).map(
                (item, index) => {
                  const currentIndex =
                    [
                      "details",
                      "payment",
                      "confirmation",
                    ].indexOf(
                      bookingStep
                    );

                  const complete =
                    currentIndex >
                    index;

                  return (
                    <div
                      className={
                        bookingStep ===
                          item ||
                        complete
                          ? "step active"
                          : "step"
                      }
                      key={item}
                    >
                      <b>
                        {complete
                          ? "✓"
                          : index + 1}
                      </b>

                      <span>
                        {item ===
                        "details"
                          ? "Participant details"
                          : item ===
                              "payment"
                            ? "Payment"
                            : "Confirmation"}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* STEP 1 */}

          {bookingStep ===
            "details" && (
            <div className="booking-body two-col">
              <div>
                <h3>
                  Participant details
                </h3>

                <p className="muted">
                  Enter the details of the
                  person attending the event.
                </p>

                <div className="form-grid">
                  <Field
                    label="Full name *"
                    className="span2"
                  >
                    <input
                      className="field"
                      value={
                        participantName
                      }
                      onChange={(event) =>
                        setParticipantName(
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter full name"
                    />
                  </Field>

                  <Field label="Age *">
                    <input
                      className="field"
                      type="number"
                      min="1"
                      max="120"
                      value={
                        participantAge
                      }
                      onChange={(event) =>
                        setParticipantAge(
                          event.target
                            .value
                        )
                      }
                    />
                  </Field>

                  <Field label="Mobile number *">
                    <input
                      className="field"
                      value={
                        participantMobile
                      }
                      onChange={(event) =>
                        setParticipantMobile(
                          event.target
                            .value
                        )
                      }
                      placeholder="+91 98765 43210"
                    />
                  </Field>

                  <Field
                    label="Email address *"
                    className="span2"
                  >
                    <input
                      className="field"
                      type="email"
                      value={
                        participantEmail
                      }
                      onChange={(event) =>
                        setParticipantEmail(
                          event.target
                            .value
                        )
                      }
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field
                    label="Address *"
                    className="span2"
                  >
                    <textarea
                      className="field textarea"
                      value={
                        participantAddress
                      }
                      onChange={(event) =>
                        setParticipantAddress(
                          event.target
                            .value
                        )
                      }
                      placeholder="House number, street, area"
                    />
                  </Field>

                  <Field label="City *">
                    <input
                      className="field"
                      value={
                        participantCity
                      }
                      onChange={(event) =>
                        setParticipantCity(
                          event.target
                            .value
                        )
                      }
                      placeholder="Mumbai"
                    />
                  </Field>

                  <Field label="State *">
                    <input
                      className="field"
                      value={
                        participantState
                      }
                      onChange={(event) =>
                        setParticipantState(
                          event.target
                            .value
                        )
                      }
                      placeholder="Maharashtra"
                    />
                  </Field>
                </div>

                <button
                  className="primary full next"
                  onClick={
                    continueToPayment
                  }
                >
                  Continue to payment
                  <Icon name="arrow" />
                </button>
              </div>

              <Summary
                event={
                  currentBookingEvent
                }
              />
            </div>
          )}

          {/* STEP 2 */}

          {bookingStep ===
            "payment" && (
            <div className="booking-body two-col">
              <div>
                <button
                  className="link-btn"
                  onClick={() =>
                    setBookingStep(
                      "details"
                    )
                  }
                >
                  <Icon
                    name="back"
                    size={16}
                  />
                  Back to details
                </button>

                <h3>
                  Secure payment
                </h3>

                <p className="muted">
                  Choose a payment method to
                  confirm your registration.
                </p>

                <div className="pay-methods">
                  <button
                    className={
                      paymentMethod ===
                      "UPI"
                        ? "pay-active"
                        : ""
                    }
                    onClick={() =>
                      setPaymentMethod(
                        "UPI"
                      )
                    }
                  >
                    <Icon name="bank" />
                    <b>UPI</b>
                  </button>

                  <button
                    className={
                      paymentMethod ===
                      "Card"
                        ? "pay-active"
                        : ""
                    }
                    onClick={() =>
                      setPaymentMethod(
                        "Card"
                      )
                    }
                  >
                    <Icon name="credit" />
                    <b>Card</b>
                  </button>

                  <button
                    className={
                      paymentMethod ===
                      "Net Banking"
                        ? "pay-active"
                        : ""
                    }
                    onClick={() =>
                      setPaymentMethod(
                        "Net Banking"
                      )
                    }
                  >
                    <Icon name="bank" />
                    <b>
                      Net Banking
                    </b>
                  </button>
                </div>

                {paymentMethod ===
                  "UPI" && (
                  <Field label="UPI ID *">
                    <input
                      className="field"
                      value={upiId}
                      onChange={(event) =>
                        setUpiId(
                          event.target
                            .value
                        )
                      }
                      placeholder="name@upi"
                    />
                  </Field>
                )}

                {paymentMethod ===
                  "Card" && (
                  <div className="form-grid">
                    <Field
                      label="Card number *"
                      className="span2"
                    >
                      <input
                        className="field"
                        value={
                          cardNumber
                        }
                        onChange={(event) =>
                          setCardNumber(
                            event.target
                              .value
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                      />
                    </Field>

                    <Field label="Name on card *">
                      <input
                        className="field"
                        value={
                          cardName
                        }
                        onChange={(event) =>
                          setCardName(
                            event.target
                              .value
                          )
                        }
                      />
                    </Field>

                    <Field label="Expiry *">
                      <input
                        className="field"
                        value={
                          cardExpiry
                        }
                        onChange={(event) =>
                          setCardExpiry(
                            event.target
                              .value
                          )
                        }
                        placeholder="MM/YY"
                      />
                    </Field>

                    <Field label="CVV *">
                      <input
                        className="field"
                        type="password"
                        value={cardCvv}
                        onChange={(event) =>
                          setCardCvv(
                            event.target
                              .value
                          )
                        }
                        placeholder="•••"
                      />
                    </Field>
                  </div>
                )}

                {paymentMethod ===
                  "Net Banking" && (
                  <div className="security">
                    <Icon name="lock" />

                    <p>
                      Production will
                      redirect to your bank.
                      This prototype confirms
                      the booking locally.
                    </p>
                  </div>
                )}

                <div className="security">
                  <Icon name="lock" />

                  <p>
                    Secure payment flow.
                    Gateway integration can
                    be connected on the backend.
                  </p>
                </div>

                <button
                  className="primary orange full next"
                  onClick={
                    processPayment
                  }
                >
                  Pay ₹
                  {currentBookingEvent.ticketPrice.toLocaleString(
                    "en-IN"
                  )}
                </button>
              </div>

              <Summary
                event={
                  currentBookingEvent
                }
              />
            </div>
          )}

          {/* STEP 3 */}

          {bookingStep ===
            "confirmation" &&
            booking && (
              <div className="confirmation">
                <div className="success">
                  <Icon
                    name="verified"
                    size={30}
                  />
                </div>

                <span className="eyebrow green">
                  REGISTRATION CONFIRMED
                </span>

                <h2>
                  You're all set!
                </h2>

                <p className="muted">
                  Your registration has been
                  successfully completed.
                </p>

                <div className="ticket">
                  <div>
                    <span>
                      DIGITAL EVENT PASS
                    </span>

                    <h3>
                      {
                        currentBookingEvent.name
                      }
                    </h3>

                    <small>
                      {
                        currentBookingEvent.date
                      }{" "}
                      ·{" "}
                      {
                        currentBookingEvent.venue
                      }
                    </small>
                  </div>

                  <div className="ticket-main">
                    <FakeQR
                      value={
                        booking.bookingId
                      }
                    />

                    <div className="detail-grid">
                      <InfoBox
                        label="Participant"
                        value={
                          booking.name
                        }
                      />

                      <InfoBox
                        label="Age"
                        value={`${booking.age}`}
                      />

                      <InfoBox
                        label="Ticket"
                        value={
                          booking.ticketType
                        }
                      />

                      <InfoBox
                        label="Amount"
                        value={`₹${booking.amount.toLocaleString(
                          "en-IN"
                        )}`}
                      />

                      <InfoBox
                        label="Booking ID"
                        value={
                          booking.bookingId
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="confirm-actions">
                  <button
                    className="primary full"
                    onClick={() => {
                      closeBooking();
                      setSelectedCustomerEvent(
                        null
                      );
                    }}
                  >
                    Back to events
                  </button>

                  <button
                    className="secondary full"
                    onClick={() =>
                      window.print()
                    }
                  >
                    <Icon name="download" />
                    Save / print ticket
                  </button>
                </div>
              </div>
            )}
        </Modal>
      )}

      {/* ======================================================
          CREATE EVENT MODAL
      ====================================================== */}

      {showCreateEvent && (
        <Modal
          close={() =>
            setShowCreateEvent(false)
          }
          wide
        >
          <div className="booking-head">
            <div>
              <span>
                EVENT SETUP
              </span>

              <h2>
                Create new event
              </h2>

              <small>
                Complete the details before
                submitting for verification.
              </small>
            </div>

            <button
              className="icon-btn"
              onClick={() =>
                setShowCreateEvent(false)
              }
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="modal-body form-grid">
            <Field
              label="Event name *"
              className="span2"
            >
              <input
                className="field"
                value={eventName}
                onChange={(event) =>
                  setEventName(
                    event.target.value
                  )
                }
                placeholder="Enter official event name"
              />
            </Field>

            <Field label="Category *">
              <select
                className="field"
                value={eventCategory}
                onChange={(event) =>
                  setEventCategory(
                    event.target.value
                  )
                }
              >
                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </Field>

            <Field label="Event type *">
              <select
                className="field"
                value={eventType}
                onChange={(event) =>
                  setEventType(
                    event.target.value
                  )
                }
              >
                {eventTypes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </Field>

            <Field
              label="Description"
              className="span2"
            >
              <textarea
                className="field textarea"
                value={
                  eventDescription
                }
                onChange={(event) =>
                  setEventDescription(
                    event.target
                      .value
                  )
                }
                placeholder="Describe the event..."
              />
            </Field>

            <Field label="Date *">
              <input
                type="date"
                className="field"
                value={eventDate}
                onChange={(event) =>
                  setEventDate(
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label="City *">
              <input
                className="field"
                value={eventCity}
                onChange={(event) =>
                  setEventCity(
                    event.target.value
                  )
                }
                placeholder="Mumbai"
              />
            </Field>

            <Field label="Start time">
              <input
                type="time"
                className="field"
                value={
                  eventStartTime
                }
                onChange={(event) =>
                  setEventStartTime(
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label="End time">
              <input
                type="time"
                className="field"
                value={eventEndTime}
                onChange={(event) =>
                  setEventEndTime(
                    event.target.value
                  )
                }
              />
            </Field>

            <Field
              label="Venue *"
              className="span2"
            >
              <input
                className="field"
                value={eventVenue}
                onChange={(event) =>
                  setEventVenue(
                    event.target.value
                  )
                }
                placeholder="Venue / stadium / auditorium"
              />
            </Field>

            <Field label="Capacity *">
              <input
                type="number"
                min="1"
                className="field"
                value={eventCapacity}
                onChange={(event) =>
                  setEventCapacity(
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label="Ticket name">
              <input
                className="field"
                value={ticketName}
                onChange={(event) =>
                  setTicketName(
                    event.target.value
                  )
                }
              />
            </Field>

            <Field label="Ticket price *">
              <input
                type="number"
                min="0"
                className="field"
                value={ticketPrice}
                onChange={(event) =>
                  setTicketPrice(
                    event.target.value
                  )
                }
              />
            </Field>

            <div className="span2 warning">
              <Icon name="warning" />

              <div>
                <b>
                  Verification is required
                </b>

                <p>
                  After creating the event,
                  upload at least two
                  verification documents before
                  submitting it to the Owner.
                </p>
              </div>
            </div>

            <div className="span2 modal-actions">
              <button
                className="secondary full"
                onClick={() =>
                  setShowCreateEvent(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary orange full"
                onClick={createEvent}
              >
                Create event
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ======================================================
          PROXY VERIFICATION MODAL
      ====================================================== */}

      {selectedEvent !== null &&
        role === "proxy" && (
          <Modal
            close={() =>
              setSelectedEvent(null)
            }
          >
            {(() => {
              const event =
                events.find(
                  (item) =>
                    item.id ===
                    selectedEvent
                );

              if (!event) {
                return null;
              }

              return (
                <>
                  <div className="booking-head">
                    <div>
                      <span>
                        {event.status ===
                        "PUBLISHED"
                          ? "EVENT MANAGEMENT"
                          : "VERIFICATION"}
                      </span>

                      <h2>
                        {event.name}
                      </h2>
                    </div>

                    <button
                      className="icon-btn"
                      onClick={() =>
                        setSelectedEvent(
                          null
                        )
                      }
                    >
                      <Icon name="close" />
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="three">
                      <InfoBox
                        icon="calendar"
                        label="Date"
                        value={
                          event.date
                        }
                      />

                      <InfoBox
                        icon="pin"
                        label="City"
                        value={
                          event.city
                        }
                      />

                      <InfoBox
                        icon="users"
                        label="Registered"
                        value={`${event.registered}`}
                      />
                    </div>

                    {event.status ===
                    "PUBLISHED" ? (
                      <div className="security success-box">
                        <Icon name="verified" />

                        <p>
                          This event is
                          published and
                          visible to customers.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="warning">
                          <Icon name="warning" />

                          <div>
                            <b>
                              Submit proof before
                              publication
                            </b>

                            <p>
                              Add at least two
                              verification
                              documents.
                            </p>
                          </div>
                        </div>

                        <Field label="Add document">
                          <div className="inline">
                            <input
                              className="field"
                              value={
                                documentName
                              }
                              onChange={(event) =>
                                setDocumentName(
                                  event.target
                                    .value
                                )
                              }
                              placeholder="Venue permission"
                            />

                            <button
                              className="secondary"
                              onClick={
                                addDocument
                              }
                            >
                              Add
                            </button>
                          </div>
                        </Field>

                        <div className="doc-list">
                          {documents.map(
                            (
                              document,
                              index
                            ) => (
                              <div
                                key={`${document}-${index}`}
                              >
                                <span>
                                  <Icon
                                    name="check"
                                    size={15}
                                  />

                                  {
                                    document
                                  }
                                </span>

                                <button
                                  onClick={() =>
                                    removeDocument(
                                      index
                                    )
                                  }
                                >
                                  <Icon
                                    name="close"
                                    size={15}
                                  />
                                </button>
                              </div>
                            )
                          )}
                        </div>

                        <button
                          className="primary orange full"
                          onClick={() =>
                            submitVerification(
                              event.id
                            )
                          }
                        >
                          Submit for verification
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })()}
          </Modal>
        )}

      {/* ======================================================
          OWNER REVIEW MODAL
      ====================================================== */}

      {selectedEvent !== null &&
        role === "owner" && (
          <Modal
            close={() =>
              setSelectedEvent(null)
            }
            wide
          >
            {(() => {
              const event =
                events.find(
                  (item) =>
                    item.id ===
                    selectedEvent
                );

              if (!event) {
                return null;
              }

              return (
                <>
                  <div className="booking-head purple-head">
                    <div>
                      <span>
                        EVENT REVIEW
                      </span>

                      <h2>
                        {event.name}
                      </h2>
                    </div>

                    <button
                      className="icon-btn"
                      onClick={() =>
                        setSelectedEvent(
                          null
                        )
                      }
                    >
                      <Icon name="close" />
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="three">
                      <InfoBox
                        label="Organizer"
                        value={
                          event.organizer
                        }
                      />

                      <InfoBox
                        label="Date"
                        value={
                          event.date
                        }
                      />

                      <InfoBox
                        label="Venue"
                        value={`${event.venue}, ${event.city}`}
                      />
                    </div>

                    <div className="detail-grid">
                      <InfoBox
                        label="Event type"
                        value={
                          event.type
                        }
                      />

                      <InfoBox
                        label="Category"
                        value={
                          event.category
                        }
                      />

                      <InfoBox
                        label="Capacity"
                        value={`${event.capacity}`}
                      />

                      <InfoBox
                        label="Ticket"
                        value={`${event.ticketName} · ₹${event.ticketPrice}`}
                      />
                    </div>

                    <div className="review-description">
                      <p className="detail-label">
                        Description
                      </p>

                      <p className="long-text">
                        {
                          event.description
                        }
                      </p>
                    </div>

                    <div className="verification-section">
                      <h3>
                        Verification documents
                      </h3>

                      {event.documents.length ===
                      0 ? (
                        <div className="empty small">
                          No verification
                          documents uploaded.
                        </div>
                      ) : (
                        <div className="document-grid">
                          {event.documents.map(
                            (
                              document
                            ) => (
                              <div
                                key={
                                  document
                                }
                                className="document-card"
                              >
                                <Icon
                                  name="verified"
                                  size={17}
                                />

                                {
                                  document
                                }
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {event.status ===
                      "UNDER_VERIFICATION" && (
                      <div className="modal-actions">
                        <button
                          className="approve"
                          onClick={() =>
                            updateEventStatus(
                              event.id,
                              "PUBLISHED"
                            )
                          }
                        >
                          Approve & publish
                        </button>

                        <button
                          className="primary orange"
                          onClick={() =>
                            updateEventStatus(
                              event.id,
                              "DOCUMENTS_REQUIRED"
                            )
                          }
                        >
                          Request documents
                        </button>

                        <button
                          className="danger"
                          onClick={() =>
                            updateEventStatus(
                              event.id,
                              "REJECTED"
                            )
                          }
                        >
                          Reject event
                        </button>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </Modal>
        )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer>
        <p>
          © 2026 CrowdGrid · Event
          Management Platform
        </p>

        <p>
          Prototype mode · Database and
          payment integration ready for
          next phase
        </p>
      </footer>

      {/* ======================================================
          STYLES
      ====================================================== */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f9f9ff;
          color: #001b3d;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .app {
          min-height: 100vh;
          background: #f9f9ff;
        }

        /* HEADER */

        header {
          position: sticky;
          top: 0;
          z-index: 50;
          min-height: 74px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: rgba(
            255,
            255,
            255,
            0.96
          );
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #dce4ef;
        }

        .brand {
          border: 0;
          background: transparent;
          color: #001b3d;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0;
        }

        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #001b3d;
          color: white;
          display: grid;
          place-items: center;
        }

        .brand > span:last-child {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .brand b {
          font-size: 18px;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .brand small {
          margin-top: 4px;
          font-size: 8px;
          color: #60708a;
          letter-spacing: 0.18em;
          font-weight: 900;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #eef3f9;
          padding: 4px;
          border-radius: 12px;
          border: 1px solid #dce4ef;
        }

        nav button {
          border: 0;
          background: transparent;
          color: #60708a;
          border-radius: 9px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 800;
        }

        nav button:hover {
          color: #001b3d;
        }

        nav .nav-active {
          background: white;
          color: #001b3d;
          box-shadow:
            0 2px 7px
              rgba(0, 27, 61, 0.08);
        }

        nav .nav-active.proxy {
          background: #f58220;
          color: white;
        }

        nav .nav-active.owner {
          background: #6246ea;
          color: white;
        }

        .head-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .help {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #60708a;
          font-size: 13px;
          font-weight: 700;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e7eef7;
          display: grid;
          place-items: center;
        }

        /* GENERAL */

        .content {
          width: min(
            1440px,
            calc(100% - 48px)
          );
          margin: 0 auto;
          padding: 42px 0;
        }

        .hero {
          background: #001b3d;
          color: white;
        }

        .hero > div {
          width: min(
            1440px,
            calc(100% - 48px)
          );
          margin: 0 auto;
          padding: 80px 0 86px;
        }

        .hero h1 {
          margin: 18px 0 0;
          max-width: 800px;
          font-size: clamp(
            42px,
            6vw,
            72px
          );
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .hero h1 em {
          color: #f58220;
          font-style: normal;
        }

        .hero p {
          max-width: 680px;
          margin: 24px 0 0;
          color: #c9d6e6;
          line-height: 1.7;
          font-size: 16px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #f58220;
          font-size: 10px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: 0.16em;
        }

        .eyebrow.dark {
          color: white;
        }

        .eyebrow.dark i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f58220;
        }

        .eyebrow.orange {
          color: #f58220;
        }

        .eyebrow.purple {
          color: #6246ea;
        }

        .eyebrow.green {
          color: #0a8f4c;
        }

        /* SEARCH */

        .searchbar {
          max-width: 820px;
          margin-top: 34px;
          padding: 8px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #60708a;
          box-shadow:
            0 20px 50px
              rgba(0, 0, 0, 0.18);
        }

        .searchbar input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          color: #001b3d;
          padding: 12px 4px;
        }

        .searchbar button {
          border: 0;
          background: #f58220;
          color: white;
          border-radius: 11px;
          padding: 12px 20px;
          font-weight: 900;
          white-space: nowrap;
        }

        /* SECTION */

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 18px;
        }

        .section-head h2,
        .admin-head h2 {
          margin: 8px 0 0;
          font-size: 34px;
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 950;
        }

        .section-head p,
        .admin-head p {
          margin: 9px 0 0;
          color: #60708a;
          font-size: 13px;
        }

        /* FILTER */

        .filter-wrap {
          position: relative;
        }

        .filter-btn {
          border: 1px solid #d3ddea;
          background: white;
          color: #001b3d;
          border-radius: 11px;
          padding: 11px 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 900;
        }

        .filter-btn:hover,
        .filter-btn.selected {
          border-color: #001b3d;
          background: #eef3f9;
        }

        .filter-dot {
          color: #f58220;
          font-size: 18px;
          line-height: 0;
        }

        .filter-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 330px;
          z-index: 20;
          padding: 18px;
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 15px;
          box-shadow:
            0 20px 60px
              rgba(0, 27, 61, 0.14);
        }

        .filter-title {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .filter-title b {
          display: block;
          font-size: 15px;
        }

        .filter-title small {
          display: block;
          margin-top: 4px;
          color: #718198;
          font-size: 11px;
        }

        .filter-title button {
          border: 0;
          background: transparent;
          color: #f58220;
          font-size: 11px;
          font-weight: 900;
        }

        .apply {
          width: 100%;
          margin-top: 15px;
          border: 0;
          border-radius: 10px;
          padding: 12px;
          background: #001b3d;
          color: white;
          font-weight: 900;
        }

        .result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 18px 0;
          color: #718198;
          font-size: 12px;
        }

        .result-row button {
          border: 0;
          background: transparent;
          color: #f58220;
          font-weight: 900;
        }

        /* CARDS */

        .cards {
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 18px;
        }

        .card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 16px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 18px 45px
              rgba(0, 27, 61, 0.1);
        }

        .card-art {
          height: 190px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            linear-gradient(
              135deg,
              #001b3d,
              #123c69 55%,
              #f58220
            );
          color: white;
        }

        .card-art > span {
          width: max-content;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(
            255,
            255,
            255,
            0.9
          );
          color: #001b3d;
          font-size: 10px;
          font-weight: 900;
        }

        .card-art small {
          display: block;
          color: rgba(
            255,
            255,
            255,
            0.7
          );
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 9px;
          font-weight: 900;
        }

        .card-art b {
          display: block;
          margin-top: 5px;
          font-size: 22px;
        }

        .card-body {
          min-height: 300px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .title-row h3 {
          margin: 0;
          font-size: 19px;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .title-row > svg {
          flex-shrink: 0;
          color: #f58220;
        }

        .desc {
          margin: 11px 0 0;
          color: #60708a;
          font-size: 12px;
          line-height: 1.55;
        }

        .info-grid,
        .three {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: 10px;
          margin-top: 18px;
        }

        .three {
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          margin-top: 0;
        }

        .info-box {
          min-width: 0;
          padding: 12px;
          background: #f5f7fb;
          border-radius: 10px;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #718198;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 900;
        }

        .info-value {
          margin-top: 5px;
          color: #001b3d;
          font-size: 12px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .card-bottom {
          margin-top: auto;
          padding-top: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }

        .card-bottom small {
          display: block;
          color: #718198;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 9px;
          font-weight: 900;
        }

        .card-bottom strong {
          display: block;
          margin-top: 3px;
          font-size: 22px;
        }

        .card-bottom button {
          border: 0;
          border-radius: 10px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          gap: 7px;
          background: #001b3d;
          color: white;
          font-weight: 900;
        }

        /* EMPTY */

        .empty {
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 16px;
          padding: 70px 30px;
          text-align: center;
          color: #718198;
        }

        .empty h3 {
          margin: 13px 0 5px;
          color: #001b3d;
        }

        .empty p {
          margin: 0;
        }

        .empty.small {
          padding: 40px;
        }

        /* BUTTONS */

        .primary,
        .secondary,
        .approve,
        .danger {
          border: 0;
          border-radius: 10px;
          padding: 11px 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-weight: 900;
        }

        .primary {
          background: #001b3d;
          color: white;
        }

        .primary.orange {
          background: #f58220;
          color: white;
        }

        .primary.purple {
          background: #6246ea;
          color: white;
        }

        .secondary {
          background: #eef3f9;
          color: #001b3d;
        }

        .approve {
          background: #ecfbf2;
          color: #087443;
        }

        .danger {
          background: #dc2626;
          color: white;
        }

        .full {
          width: 100%;
        }

        .link-btn {
          border: 0;
          background: transparent;
          color: #60708a;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        /* FORMS */

        .field-label {
          display: block;
          margin-bottom: 6px;
          color: #263952;
          font-size: 11px;
          font-weight: 900;
        }

        .field {
          width: 100%;
          min-width: 0;
          border: 1px solid #d3ddea;
          background: white;
          border-radius: 10px;
          padding: 11px 12px;
          color: #001b3d;
          outline: 0;
          font-size: 13px;
          transition:
            border-color 0.15s,
            box-shadow 0.15s;
        }

        .field:focus {
          border-color: #42658c;
          box-shadow:
            0 0 0 3px
              rgba(66, 101, 140, 0.1);
        }

        .textarea {
          min-height: 95px;
          resize: vertical;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: 15px;
          margin-top: 18px;
        }

        .form-stack {
          display: grid;
          gap: 15px;
        }

        .span2 {
          grid-column: span 2;
        }

        /* ADMIN */

        .admin {
          padding-top: 42px;
        }

        .admin-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 24px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(
            4,
            minmax(0, 1fr)
          );
          gap: 14px;
        }

        .stats.five {
          grid-template-columns: repeat(
            5,
            minmax(0, 1fr)
          );
        }

        .stat-card {
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 15px;
          padding: 18px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #eef3f9;
          display: grid;
          place-items: center;
        }

        .stat-label {
          margin-top: 18px;
        }

        .stat-value {
          margin-top: 2px;
          font-size: 30px;
          line-height: 1;
          font-weight: 950;
        }

        .muted {
          color: #60708a;
          font-size: 13px;
        }

        .admin-grid {
          display: grid;
          grid-template-columns:
            1.65fr
            0.7fr;
          gap: 18px;
          margin-top: 18px;
        }

        .panel {
          margin-top: 18px;
          overflow: hidden;
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 16px;
        }

        .panel-head {
          padding: 20px;
          border-bottom: 1px solid #edf1f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .panel-head h3 {
          margin: 0;
          font-size: 19px;
        }

        .panel-head p {
          margin: 5px 0 0;
          color: #60708a;
          font-size: 13px;
        }

        .event-row {
          padding: 20px;
          border-top: 1px solid #edf1f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .row-title {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .row-title b {
          font-size: 16px;
        }

        .event-row p {
          margin: 8px 0 0;
          color: #60708a;
          font-size: 13px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .row-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .dark-panel {
          padding: 22px;
          background: #001b3d;
          color: white;
          border-radius: 16px;
        }

        .dark-panel h3 {
          margin: 6px 0;
          font-size: 25px;
        }

        .dark-panel p {
          color: #aebfd4;
          font-size: 13px;
        }

        .dark-panel > strong {
          display: block;
          margin-top: 22px;
          font-size: 42px;
        }

        .dark-panel > small {
          display: block;
          color: #aebfd4;
        }

        .dark-panel button {
          width: 100%;
          margin-top: 24px;
          border: 0;
          border-radius: 10px;
          padding: 12px;
          background: white;
          color: #001b3d;
          font-weight: 900;
        }

        /* TABLE */

        .table-search {
          width: 300px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 10px;
          color: #718198;
          border: 1px solid #d3ddea;
          border-radius: 10px;
        }

        .table-search input {
          width: 100%;
          border: 0;
          outline: 0;
          padding: 11px 0;
        }

        .table-scroll {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 950px;
          border-collapse: collapse;
        }

        th {
          padding: 12px;
          text-align: left;
          background: #f5f7fb;
          color: #718198;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        td {
          padding: 15px 12px;
          border-top: 1px solid #edf1f6;
          color: #263952;
          font-size: 12px;
          vertical-align: top;
        }

        td b {
          display: block;
        }

        td small {
          display: block;
          margin-top: 4px;
          color: #718198;
        }

        .paid {
          color: #087443;
          font-size: 10px;
          font-weight: 900;
        }

        .pending {
          color: #b35a00;
          font-size: 10px;
          font-weight: 900;
        }

        /* STATUS */

        .badge {
          display: inline-flex;
          padding: 5px 8px;
          border-radius: 999px;
          border: 1px solid;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .badge.published {
          background: #ecfbf2;
          color: #087443;
          border-color: #bfe8ce;
        }

        .badge.under_verification {
          background: #fff8e9;
          color: #a56200;
          border-color: #f0d89a;
        }

        .badge.documents_required {
          background: #fff0e5;
          color: #c45e09;
          border-color: #ffd0ae;
        }

        .badge.draft {
          background: #f2f4f7;
          color: #60708a;
          border-color: #dce4ef;
        }

        .badge.rejected {
          background: #fff0f0;
          color: #b42318;
          border-color: #f0b8b8;
        }

        /* REGISTER */

        .register-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          background: white;
          border: 1px solid #dce4ef;
          border-radius: 18px;
        }

        .register-left {
          padding: 45px;
          background: #001b3d;
          color: white;
        }

        .register-left h2 {
          margin: 14px 0;
          font-size: 38px;
          line-height: 1.08;
        }

        .register-left p {
          color: #c9d6e6;
          line-height: 1.6;
        }

        .steps-list {
          display: grid;
          gap: 15px;
          margin-top: 30px;
        }

        .steps-list div {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 800;
        }

        .steps-list b {
          color: #f58220;
        }

        .register-right {
          padding: 45px;
        }

        .register-right h3 {
          margin: 16px 0;
          font-size: 27px;
        }

        .register-right > p {
          margin-bottom: 22px;
          color: #60708a;
          font-size: 13px;
          line-height: 1.6;
        }

        .big-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: #fff0e5;
          color: #f58220;
          display: grid;
          place-items: center;
        }

        .notice {
          margin-bottom: 16px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #bfe8ce;
          border-radius: 10px;
          background: #ecfbf2;
          color: #087443;
          font-size: 12px;
          font-weight: 800;
        }

        .access {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 15px;
          border-radius: 10px;
          background: #6246ea12;
          color: #6246ea;
          font-size: 13px;
          font-weight: 900;
        }

        /* MODAL */

        .overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(
            0,
            27,
            61,
            0.7
          );
          backdrop-filter: blur(7px);
        }

        .modal {
          width: min(680px, 100%);
          overflow: hidden;
          background: white;
          border-radius: 20px;
          box-shadow:
            0 30px 80px
              rgba(0, 27, 61, 0.2);
        }

        .modal.wide {
          width: min(980px, 100%);
        }

        .modal-art {
          position: relative;
          min-height: 220px;
          padding: 26px;
          display: flex;
          align-items: flex-end;
          color: white;
          background:
            linear-gradient(
              135deg,
              #001b3d,
              #123c69 55%,
              #f58220
            );
        }

        .modal-art span {
          color: #ffd4b2;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .modal-art h2 {
          margin: 8px 0 0;
          max-width: 700px;
          font-size: 32px;
          line-height: 1.05;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 10px;
          background: #ffffff22;
          color: white;
          display: grid;
          place-items: center;
        }

        .icon-btn.light {
          background: #eef3f9;
          color: #001b3d;
        }

        .modal-art .icon-btn {
          position: absolute;
          top: 18px;
          right: 18px;
        }

        .modal-body {
          padding: 26px;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 28px;
          margin-top: 28px;
        }

        .detail-layout h3,
        .booking-body h3 {
          margin: 0;
          font-size: 21px;
        }

        .long-text {
          color: #60708a;
          line-height: 1.65;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: 10px;
          margin-top: 20px;
        }

        .price-box {
          height: max-content;
          padding: 18px;
          border-radius: 14px;
          background: #f5f7fb;
        }

        .price-box small {
          display: block;
          color: #718198;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .price-box strong {
          display: block;
          margin-top: 5px;
          font-size: 31px;
        }

        .price-box p {
          color: #60708a;
          font-size: 12px;
        }

        .booking-head {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          background: #001b3d;
          color: white;
        }

        .booking-head > div > span {
          color: #f58220;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .booking-head h2 {
          margin: 5px 0 0;
          font-size: 23px;
        }

        .booking-head small {
          display: block;
          margin-top: 5px;
          color: #c9d6e6;
        }

        .purple-head {
          background: #6246ea;
        }

        .steps {
          grid-column: 1 / -1;
          display: flex;
          margin-top: 15px;
        }

        .step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aebfd4;
          font-size: 11px;
          font-weight: 800;
        }

        .step b {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #eef3f9;
          color: #60708a;
          display: grid;
          place-items: center;
        }

        .step.active {
          color: white;
        }

        .step.active b {
          background: white;
          color: #001b3d;
        }

        .booking-body.two-col {
          display: grid;
          grid-template-columns:
            1.35fr
            0.65fr;
          gap: 30px;
          padding: 28px;
        }

        .next {
          margin-top: 20px;
        }

        .summary {
          height: max-content;
          padding: 18px;
          border-radius: 14px;
          background: #f5f7fb;
        }

        .summary > span {
          color: #718198;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .summary h3 {
          margin: 8px 0 20px;
          font-size: 18px;
        }

        .summary > div {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          font-size: 13px;
        }

        .summary small {
          color: #60708a;
        }

        .summary hr {
          margin: 15px 0;
          border: 0;
          border-top: 1px solid #dce4ef;
        }

        /* PAYMENT */

        .pay-methods {
          display: grid;
          grid-template-columns: repeat(
            3,
            1fr
          );
          gap: 8px;
          margin: 20px 0;
        }

        .pay-methods button {
          padding: 14px 8px;
          border: 1px solid #dce4ef;
          border-radius: 11px;
          background: white;
          color: #001b3d;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
        }

        .pay-methods .pay-active {
          border-color: #001b3d;
          background: #eef3f9;
          box-shadow:
            0 0 0 1px #001b3d;
        }

        .security {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          padding: 13px;
          border: 1px solid #cfead8;
          border-radius: 11px;
          background: #eef8f1;
          color: #17643a;
          font-size: 12px;
        }

        .security p {
          margin: 0;
        }

        .warning {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          padding: 14px;
          border: 1px solid #ffd8b7;
          border-radius: 12px;
          background: #fff7ef;
        }

        .warning > svg {
          flex-shrink: 0;
          color: #f58220;
        }

        .warning b {
          font-size: 13px;
        }

        .warning p {
          margin: 4px 0 0;
          color: #76583f;
          font-size: 12px;
          line-height: 1.5;
        }

        .success-box {
          margin-top: 18px;
        }

        /* DOCUMENTS */

        .inline {
          display: flex;
          gap: 8px;
        }

        .doc-list {
          margin: 12px 0;
        }

        .doc-list > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 7px;
          padding: 10px;
          border: 1px solid #dce4ef;
          border-radius: 9px;
          font-size: 12px;
        }

        .doc-list span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .doc-list button {
          border: 0;
          background: transparent;
          color: #b42318;
        }

        .verification-section {
          margin-top: 26px;
        }

        .verification-section h3 {
          margin: 0;
          font-size: 17px;
        }

        .document-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: 10px;
          margin-top: 12px;
        }

        .document-card {
          padding: 12px;
          border: 1px solid #dce4ef;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #087443;
          font-size: 12px;
          font-weight: 800;
        }

        .review-description {
          margin-top: 24px;
        }

        .detail-label {
          color: #718198;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* CONFIRMATION */

        .confirmation {
          padding: 34px;
          text-align: center;
        }

        .success {
          width: 58px;
          height: 58px;
          margin: auto;
          border-radius: 50%;
          background: #ecfbf2;
          color: #0a8f4c;
          display: grid;
          place-items: center;
        }

        .confirmation h2 {
          margin: 7px 0;
          font-size: 31px;
        }

        .ticket {
          max-width: 720px;
          margin: 25px auto 0;
          overflow: hidden;
          text-align: left;
          border: 1px solid #dce4ef;
          border-radius: 16px;
        }

        .ticket > div:first-child {
          padding: 20px;
          background: #001b3d;
          color: white;
        }

        .ticket > div:first-child span {
          color: #f58220;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .ticket h3 {
          margin: 6px 0;
          font-size: 20px;
        }

        .ticket small {
          color: #c9d6e6;
        }

        .ticket-main {
          padding: 20px;
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 22px;
          align-items: center;
        }

        .fake-qr {
          width: 140px;
          height: 140px;
          padding: 10px;
          display: grid;
          grid-template-columns: repeat(
            8,
            1fr
          );
          gap: 2px;
          border: 1px solid #dce4ef;
          border-radius: 12px;
        }

        .fake-qr i {
          background: white;
        }

        .fake-qr i.on {
          background: #001b3d;
        }

        .confirm-actions {
          max-width: 720px;
          margin: 18px auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .modal-actions {
          display: grid;
          grid-template-columns: repeat(
            3,
            1fr
          );
          gap: 8px;
          margin-top: 24px;
        }

        /* FOOTER */

        footer {
          margin-top: 30px;
          padding: 24px max(
            20px,
            calc(
              (100vw - 1440px) / 2
            )
          );
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-top: 1px solid #dce4ef;
          background: white;
          color: #718198;
          font-size: 11px;
        }

        footer p {
          margin: 0;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {
          .cards {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }

          .stats,
          .stats.five {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }

          .admin-grid,
          .detail-layout,
          .booking-body.two-col {
            grid-template-columns: 1fr;
          }

          .register-card {
            grid-template-columns: 1fr;
          }

          .register-left,
          .register-right {
            padding: 32px;
          }
        }

        @media (max-width: 760px) {
          header {
            min-height: auto;
            padding: 12px 16px;
            flex-wrap: wrap;
          }

          nav {
            order: 3;
            width: 100%;
            overflow-x: auto;
          }

          nav button {
            flex: 1;
            white-space: nowrap;
          }

          .help {
            display: none;
          }

          .content,
          .hero > div {
            width: calc(100% - 32px);
          }

          .hero > div {
            padding: 55px 0 60px;
          }

          .hero h1 {
            font-size: 44px;
          }

          .searchbar {
            flex-wrap: wrap;
          }

          .searchbar input {
            min-width: 180px;
          }

          .searchbar button {
            width: 100%;
          }

          .section-head,
          .admin-head {
            align-items: flex-start;
            flex-direction: column;
          }

          .filter-wrap {
            width: 100%;
          }

          .filter-btn {
            width: 100%;
            justify-content: center;
          }

          .filter-panel {
            left: 0;
            right: auto;
            width: min(
              360px,
              90vw
            );
          }

          .cards {
            grid-template-columns: 1fr;
          }

          .three,
          .info-grid,
          .detail-grid,
          .form-grid,
          .document-grid {
            grid-template-columns: 1fr;
          }

          .span2 {
            grid-column: auto;
          }

          .stats,
          .stats.five {
            grid-template-columns: 1fr 1fr;
          }

          .event-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .row-actions {
            width: 100%;
          }

          .row-actions button {
            flex: 1;
          }

          .table-search {
            width: 100%;
          }

          .panel-head {
            align-items: flex-start;
            flex-direction: column;
          }

          .pay-methods {
            grid-template-columns: 1fr;
          }

          .ticket-main {
            grid-template-columns: 1fr;
          }

          .fake-qr {
            margin: auto;
          }

          .confirm-actions,
          .modal-actions {
            grid-template-columns: 1fr;
          }

          .modal-body,
          .booking-body.two-col {
            padding: 20px;
          }

          .modal-art {
            min-height: 190px;
          }

          .modal-art h2 {
            font-size: 25px;
          }

          .admin-head h2,
          .section-head h2 {
            font-size: 28px;
          }

          footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .register-left h2 {
            font-size: 31px;
          }
        }

        @media print {
          header,
          footer,
          .overlay {
            display: none !important;
          }

          .app {
            background: white;
          }

          .ticket {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}